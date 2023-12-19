function Test() {
  function testServer() {
    fetch("http://localhost:8080", {
        method: "GET",
    }).then((res) => res.text())
    .then((data) => alert(data))
  }

  return (
    <button
      onClick={() => testServer()}
    >Hello, world!</button>
  )
}

export default Test
