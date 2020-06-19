import React from "react";

const Classification = ({ classifications }) => {
  return (
    <>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Probability</th>
            <th scope="col">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {classifications.map((classification, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{classification.className}</td>
                <td>{classification.probability}</td>
                <td>{classification.probability * 100}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Classification;
