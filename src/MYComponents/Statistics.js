export default function Statistics({ items }) {
  const numOfItems = items.length;
  const numOfpacked = items.filter((item) => item.packed).length;
  console.log(numOfpacked);
  console.log(numOfItems);
  const per = Math.round((numOfpacked / numOfItems) * 100);
  if (numOfItems === 0) {
    return (
      <p className="stats">
        You have 0 items in your list, Pls add and ready for trip
      </p>
    );
  }
  return (
    <>
      <div className="stats">
        {per === 100 ? (
          <p>Hey Dude, You are good to go!🌴</p>
        ) : (
          <p>
            You have {numOfItems} items in the cart and {numOfpacked} ({per}%)
            already packed
          </p>
        )}
      </div>
    </>
  );
}
