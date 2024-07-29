import React from "react";

async function PowerBi() {
  return (
    <div className="container mx-auto mt-10 flex justify-center">
      <div className="w-full max-w-xl">
        <h1 className="mb-6 text-center text-2xl font-bold">Jebyaa</h1>
        <iframe
          title="ammmar"
          width="600"
          height="373.5"
          src="https://app.powerbi.com/view?r=eyJrIjoiOTg1MTllNGItNWVhNi00YTg1LTgwMGEtMjMwOGEzNDdhOWIwIiwidCI6ImUxY2JhZWEwLWY4YzgtNGNlNy1hNDg0LWFkZTY3MmY1NWY4ZCJ9"
        ></iframe>
      </div>
    </div>
  );
}

export default PowerBi;
