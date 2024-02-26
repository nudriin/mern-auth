/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { Chart as chartjs } from "chart.js/auto";
import { getDatabase, onValue, ref } from "firebase/database";

export default function Chart() {
    const chartRef = useRef(null);
    const currRef = useRef(null);
    // const [dataa, setDataa] = useState([]);
    // Initialize Realtime Database and get a reference to the service
    const database = getDatabase();
    const references = ref(database, '/');
    let datas = [];
    onValue(references, (snapshot) => {
        datas = snapshot.val();
        // setDataa(datas);
    })
    let commercial = [];
    let country = [];
    let fullData = [];
    console.log(datas);
    for (const data of datas) {
        if(data.Commercial > 5){
            commercial.push(data.Commercial);
            country.push(data.Country);
            fullData.push(data);
        }
    }


    useEffect(() => {
        const data = {
            labels: country,
            datasets: [{
                label: 'Index penggunaan AI di dunia',
                data: commercial,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                color : [
                    'rgb(255,255,255)'
                ],
                borderWidth: 1,
                hoverOffset: 4
            }]
        };

        const ctx = chartRef.current.getContext("2d");

        const config = {
            type: 'bar',
            data: data,
            options: {
                indexAxis: 'y',
            }
        };
        if(currRef.current){
            currRef.current.destroy();
        }

        currRef.current = new chartjs(ctx, config);
    }, [chartRef]); // useEffect runs only once after the initial render

    return (
        <section className="h-full mx-auto bg-white text-slate-900">
            <h1 className="text-[45px] text-slate-900 font-bold font-futura text-center py-10">Index penggunaan AI di dunia</h1>
            <div className="grid items-center justify-center grid-cols-12 gap-4 p-4">
                <div className="col-span-6 p-6 ml-10 shadow-xl bg-slate-900 rounded-xl">
                    <canvas className="w-[200px] h-full" ref={chartRef}></canvas>
                </div>
                <div className="relative w-9/12 col-span-6 mx-auto my-10 overflow-x-auto text-sm text-justify h-72">
                    {/* <p>Kecerdasan Buatan (AI) belakangan ini telah menjadi tren dan teknologi yang sangat dicari, memperoleh perhatian luas untuk aplikasi-inovatifnya di berbagai bidang.</p>
                    <p>Dalam dunia pekerjaan, AI semakin populer, terutama melalui alat-alat seperti penyusun ringkasan PDF dan penyusun ringkasan YouTube.</p>
                    <p>Solusi AI ini memberdayakan individu dengan otomatisasi proses penyusunan ringkasan, mengekstrak inti informasi, dan merangkum materi dari dokumen panjang atau video.</p>
                    <p>Ketika organisasi berusaha untuk menyederhanakan alur kerja dan meningkatkan efisiensi, integrasi AI, dengan kemampuannya untuk cepat merangkum konten penting, telah menjadi perubahan besar dalam menyederhanakan informasi kompleks.</p>
                    <p>Ini pada akhirnya merevolusi cara para profesional mengonsumsi informasi dan membuat keputusan.</p> */}
                    <table>
                        <thead className="text-white border-2 border-slate-900 bg-dark-purple">
                            <th className="px-6 py-3">Negara</th>
                            <th className="px-6 py-3">Index</th>
                        </thead>
                        <tbody>
                            {fullData.map((value, index) => (
                                <tr className="border-2 border-slate-900" key={index}>
                                    <td className="px-6 py-3">{value.Country}</td>
                                    <td className="px-6 py-3">{value.Commercial}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
        </section>
    );
}
