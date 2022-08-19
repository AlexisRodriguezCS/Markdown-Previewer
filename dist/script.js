const { useState, useEffect } = React;

function App() {
  const [theData, setTheData] = useState([]);
  const [randomNum, setRandomNum] = useState();

  const API =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

  //------------------------------------------------------>
  // when component first mounts, it makes an API call to get data
  useEffect(() => {
    fetch(API).
    then(res => res.json()).
    then(data => setTheData(data.quotes));
  }, []);
  //-------------------------------------------------------

  //------------------------------------------------------>
  // function to load random quote when data is received
  useEffect(() => {
    newQuote();
  }, [theData]);
  //-------------------------------------------------------

  //------------------------------------------------------>
  // function to get random number
  const randomNumber = () => {
    return Math.floor(Math.random() * theData.length);
  };
  //-------------------------------------------------------

  //------------------------------------------------------>
  // onClick function to set new quote
  const newQuote = () => {
    setRandomNum(randomNumber());
  };
  //-------------------------------------------------------

  return /*#__PURE__*/(
    React.createElement("div", { id: "content" }, /*#__PURE__*/
    React.createElement("div", { id: "quote-box" }, /*#__PURE__*/
    React.createElement("div", { id: "text-box" },
    theData.length && /*#__PURE__*/React.createElement("p", { id: "text" }, theData[randomNum].quote)), /*#__PURE__*/

    React.createElement("div", { id: "author-box" },
    theData.length && /*#__PURE__*/React.createElement("h4", { id: "author" }, "-", theData[randomNum].author)), /*#__PURE__*/

    React.createElement("div", { id: "buttons-box" },
    theData.length && /*#__PURE__*/
    React.createElement("a", {
      href: `https://twitter.com/intent/tweet?text=${theData[randomNum].quote} -${theData[randomNum].author}`,
      id: "tweet-quote",
      target: "_blank",
      rel: "noreferrer noopener" }, /*#__PURE__*/

    React.createElement("i", { class: "fa fa-twitter", id: "twitter-icon", "aria-hidden": "true" })), /*#__PURE__*/


    React.createElement("button", { type: "button ", id: "new-quote", onClick: () => newQuote() }, "New Quote")))));






}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("root"));