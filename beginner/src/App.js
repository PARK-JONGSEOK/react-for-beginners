import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState(0);
  const [coin, setCoin] = useState({});
  const onChange = ({ target }) => {
    console.log(target);
    setCoin({
      value: target.value,
      name: target.name,
    });
  };
  const moneyOnChange = ({ target }) => {
    setMoney(target.value);
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={onChange}>
          {coins.map((coin, index) => (
            <option key={index} value={coin.quotes.USD.price}>
              {coin.name} ({coin.symbol}) : {coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      <div>
        <input type="number" value={money} onChange={moneyOnChange} />
        <h1>{money / coin.value}</h1>
      </div>
    </div>
  );
}

export default App;
