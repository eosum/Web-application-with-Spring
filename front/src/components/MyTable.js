import React from "react";
import { selectRows } from "../features/tableHandler/tableSlice";
import { useSelector } from "react-redux";

import "../css/Table.css";

function MyTable () {
    const rows = useSelector(selectRows);

    return (
        <div className="DataTable">
            <table>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Status</th>
                    <th>Script time</th>
                </tr>
                </thead>
                <tbody>
                {rows.map((value) => {
                    return (
                        <tr key={JSON.stringify(value)}>
                            <td>{getDateString(new Date(value.date))}</td>
                            <td>{value.x}</td>
                            <td>{value.y}</td>
                            <td>{value.r}</td>
                            <td>{value.status}</td>
                            <td>{value.execution} мс</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}

function getDateString(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    day = addUpToTwoDigits(day);
    month = addUpToTwoDigits(month);

    return day + "." + month + "." + year;
}

function addUpToTwoDigits(value) {
    if (value < 10) return "0" + value;
    return value;
}

export default MyTable;