import React from "react";
import {useSelector} from "react-redux";
import '../css/Auth.css'
import {selectR} from '../features/formHandler/formSlice'
import {selectRows} from "../features/tableHandler/tableSlice";


function HitCount() {

    const rows = useSelector(selectRows);
    const r = useSelector(selectR);
    let number = 0;
    let number_r = 0;

    const hitCount = () => {
        rows.forEach(element => {
            if (element.r === r) {
                number_r++;
                if (element.status === "hit") number++;
            }
        });
        if (isNaN(number / number_r * 100)) return 0;
        return (number / number_r * 100).toFixed(2);
    }

    return (
        <h3>Количество попаданий для текущего r = {hitCount()} %</h3>
    );
}



export default HitCount;