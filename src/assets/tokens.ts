export interface Token {
    name: string;
    image: string;
}
  
const ethereumTokens: Token[] = [
    {
        name: "Ethereum",
        image: "/images/ethereum-logo.png",
    },
    {
        name: "Aave",
        image: "/images/aave-logo.png",
    },
    {
        name: "Uniswap",
        image: "/images/uniswap-logo.png",
    }
];

export default ethereumTokens;