function DisplayColor({ color }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          margin: "30px",

          background: color,
          width: "100px",
          height: "100px",
        }}
      ></div>
      Which One ?
    </div>
  );
}
export default DisplayColor;
