const { useState, useEffect } = React;

function App() {
  // Text inside the Editor & Preview
  const [previewText, setPreviewText] = useState("");
  const [textArea, setTextArea] = useState("");

  // Set default size of Editor & Preview to small
  const [editorSize, setEditorSize] = useState("small");
  const [previewSize, setPreviewSize] = useState("small");

  // Button text that will change when clicked
  // (Expand <-> Shrink)
  const [buttonText, setButtonText] = useState("Expand");

  // Boolean to keep track
  const [editorExpand, setEditorExpand] = useState(false);
  const [previewExpand, setPreviewExpand] = useState(false);

  // Keeps track of the width
  const [width, setWidth] = useState(window.innerWidth);

  // Default text inside Editor
  const defaultText = `## Visit [here](https://daringfireball.net/projects/markdown/basics) to learn more about Markdown
# This is an H1 tag
## This is an H2 tag
### This is an  \`<h3>\` tag
>This is a blockquote
\\
*This text will be italic*
_This will also be italic_
\\
**This text will be bold**
__This will also be bold__
\\
_You **can** combine them_  
 
* Item 1
  * Item 2

\`\`\`
Multi-line code:

function fullName(firstName, lastName) {
    return firstName  + '  ' +  lastName;
}
\`\`\`  
\\
![Markdown Logo](https://kirkstrobeck.github.io/whatismarkdown.com/img/markdown.png)`;

  // Markdown
  const markdown = new marked.Renderer();

  marked.setOptions({
    breaks: true,
  });

  // Update/Stores the input entered in the text area
  // into textArea String
  const handleChange = (e) => {
    setTextArea(e.target.value);
  };

  // On load set the default text for Editor
  // and Mobile changes
  useEffect(() => {
    setTextArea(defaultText);
    mobile();
  }, []);

  // Everytime the width changes update the width variable
  useEffect(() => {
    // function to set width to current window width
    function handleResize() {
      setWidth(window.innerWidth);
    }
    // Event listener that call handleResize function when
    // resize event happens
    window.addEventListener("resize", handleResize);
    // Functions that update components depending on width
    console.log("In first: ", width);
    mobile();
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  // Update Preview when text is entered in the Editor
  useEffect(() => {
    setPreviewText(textArea);
  }, [textArea]);

  // When window size is less than 768px (Tablet/Mobile)
  // change "Expand" text to "Preview"
  function mobile() {
    if (window.innerWidth <= 768) {
      setButtonText("Preview");
      setEditorExpand(true);
    }
  }

  // Clears the text in the Editor
  function clearText() {
    setTextArea("");
  }

  // When Expand, Shrink, Preview, or Editor button is pressed
  function handleClick(divSize, setDivSize, divExpand, setDivExpand) {
    if (window.innerWidth <= 768) {
      // Mobile logic
      // Toggle text from "Preview" <-> "Editor"
      buttonText == "Preview"
        ? setButtonText("Editor")
        : setButtonText("Preview");
      // Toggle Editor moduele <-> Preview module
      if (editorExpand == true) {
        setEditorExpand(false);
        setPreviewExpand(true);
      } else {
        setEditorExpand(true);
        setPreviewExpand(false);
      }
    } else {
      // Desktop logic
      divSize == "small" ? setDivSize("big") : setDivSize("small");
      setDivExpand(!divExpand);
      buttonText == "Expand"
        ? setButtonText("Shrink")
        : setButtonText("Expand");
    }
  }

  // Editor component
  function Editor() {
    return (
      <>
        <div id={`editor-container-${editorSize}`}>
          <div id={`editor-bar-${editorSize}`}>
            <label id="editor-title">Editor</label>
            <div id="btns">
              <button id="editor-clear" onClick={() => clearText()}>
                Clear
              </button>
              <button
                id="editor-expand"
                onClick={() =>
                  handleClick(
                    editorSize,
                    setEditorSize,
                    editorExpand,
                    setEditorExpand
                  )
                }
              >
                {buttonText}
              </button>
            </div>
          </div>
          <textarea
            id={`editor-${editorSize}`}
            value={textArea}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </>
    );
  }

  // Preview component
  function Preview() {
    return (
      <>
        <div id={`preview-container-${previewSize}`}>
          <div id={`preview-bar-${previewSize}`}>
            <label id="preview-title">Preview</label>
            <div id="btns">
              <button
                id="preview-expand"
                onClick={() =>
                  handleClick(
                    previewSize,
                    setPreviewSize,
                    previewExpand,
                    setPreviewExpand
                  )
                }
              >
                {buttonText}
              </button>
            </div>
          </div>
          <div
            id={`preview-${previewSize}`}
            dangerouslySetInnerHTML={{
              __html: marked(previewText, { renderer: markdown }),
            }}
          ></div>
        </div>
      </>
    );
  }

  // Using state(previewExpand, editorExpand) to decide what component(s) will render.
  // Return Editor & Preview if both previewExpand && editorExpand equal fasle to
  // show both components at once next to each other.
  // Else if previewExpand is true then the Editor component will not return and
  // only the Preview component will be displayed.
  // Else if editorExpand is true then the Preview component will not return and
  // only the Editor component will be displayed.
  return (
    <div id="wrapper">
      {!previewExpand && Editor()}
      {!editorExpand && Preview()}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
