import React from 'react';

// A high-quality, white SVG version of the SEP logo, encoded as a data URL for better performance and scalability.
const LOGO_URL = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzODcgMTEzLjEiIGZpbGw9IiNmZmZmZmYiPjxwYXRoIGQ9Ik0zMzcuMSw0MS4zYzAtMTgtMTIuOS0yMy40LTMxLjktMjMuNGgtNDF2MTAzLjNoMjEuNFY4My43aDE5LjVMMzIzLDExMy4xaDI1LjdMMzM3LjEsODkuNFY0MS4zWm0tMjEuNCwzMC44aC0xOS41VjYwLjNoMTkuNWM5LDAsOSw3LjQsOSwxMC45djEuOVoiLz48cGF0aCBkPSJNMjQxLjUsMTEzLjFMMjYxLjIsNjAuNmgyMC45bC0yMy4yLDUyLjVIMjQxLjVaIi8+PHBhdGggZD0iTTIwNC45LDc4LjdjMC0yMy4xLDE2LjItMzcuMSwzOS4yLTM3LjFoMjEuNFY1OC45aC0yMS40YzAsMC0xMS43LDAtMTEuNywxNi41LDAsMTMuOCwxMS4zLDE1LjIsMTEuNywxNS4yaDIxLjR2MTguMmgtMjEuNGMtMjIuNiwwLTM5LjItMTQuMS0zOS4yLTM2WiIvPjxwYXRoIGQ9Ik0xMjAuNCw2My4zYzAtMjAuMy0xNC42LTI1LjctMzEuNS0yNS43SDU3LjF2MTAzLjNoMjEuNFY3OS45aDEwLjZsMTcuNywzMy4yaDI0LjRMMTE4LjEsODQuNkExOS40LDE5LjQsMCwwLDAsMTIwLjQsNjMuM1ptLTIxLjIsNC45SDc4LjV2LTE4aDIwLjdjNy44LDAsMTEuMSw0LjMsMTEuMSwxMC4xQzExMC4zLDY0LDExMC4zLDY4LjIsMTAwLjEsNjguMloiLz48cGF0aCBkPSJNNzUuMSwzNy42VjE3LjloMjEuNFYzNy42WiIvPjxwYXRoIGQ9Ik00MC42LDM3LjYxSDE5LjJWMTcuOWg4NC4zVjM3LjYxSDYwLjc5VjExMy4xSDQwLjZWOTQuMDVINzguNlY3NS44MUg0MC42WiIvPjwvc3ZnPg==`;

const Logo: React.FC = () => {
    return (
        <div className="flex flex-col items-center my-8">
            <img src={LOGO_URL} alt="Saman Electronic Payment Logo" className="w-48 h-auto" />
        </div>
    );
};

export default Logo;