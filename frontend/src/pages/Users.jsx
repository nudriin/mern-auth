/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export default function Users() {
    const [fullData, setFullData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(100); // Tentukan jumlah item per halaman

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/v1/api/pengguna", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const datas = await response.json();
                console.log(datas);
                setFullData(datas.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // Menghitung indeks data yang akan ditampilkan pada halaman ini
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = fullData.slice(indexOfFirstItem, indexOfLastItem);

    // Ubah halaman
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <section className="mx-auto h-full text-slate-900 bg-white pt-20">
                <h1 className="text-[25px] md:text-[40px] font-bold font-futura mx-auto px-6 py-4 md:w-1/2">Pengguna Binary Talk Hub</h1>
                <div className="container w-9/12 mx-auto">
                        <div className="overflow-auto h-96">
                            <table className="w-full">
                                <thead className="text-white border-2 border-slate-900 bg-dark-purple">
                                    <tr>
                                        <th className="px-6 py-3">Username</th>
                                        <th className="px-6 py-3">Nama</th>
                                        <th className="px-6 py-3">Negara</th>
                                        <th className="px-6 py-3">Jenis Kelamin</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((value, index) => (
                                        <tr className="border-2 border-slate-900" key={index}>
                                            <td className="px-6 py-3">{value.username}</td>
                                            <td className="px-6 py-3">{value.nama}</td>
                                            <td className="px-6 py-3">{value.Negara}</td>
                                            <td className="px-6 py-3">{value['Jenis Kelamin']}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        totalItems={fullData.length}
                        paginate={paginate}
                    />
                </div>
            </section>
        </div>
    );
}

// Komponen Pagination
const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="flex justify-center my-10">
                {pageNumbers.map(number => (
                    <li key={number}>
                        <button className="px-3 py-1 m-1 bg-dark-purple text-white hover:bg-purple" onClick={() => paginate(number)}>
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
