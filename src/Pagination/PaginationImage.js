import React, { useState, useEffect } from 'react';
import { db } from "../Firebase"
import { collection, getDocs } from "firebase/firestore"
import PaginationFooter from './PaginationFooter'
import ShowImage from '../Components/ShowImage';

const Pagination = () => {

    const [item, setItem] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(4);


    useEffect(() => {
        const ref = collection(db, 'image')
        const show = async () => {
            const data = await getDocs(ref)
            setItem(data.docs.map((ls, index) => ({ ...ls.data(), id: ls.id })))
        }
        show()
    }, [])


    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = item.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber)

    return (
        <>
            <ShowImage list={currentPosts} />
            <PaginationFooter postsPerPage={postsPerPage} totalPosts={item.length} paginate={paginate} />
        </>
    )
};

export default Pagination;