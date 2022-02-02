import React from 'react';
import Pagination from '@mui/material/Pagination'

const PaginationFooter = ({ postsPerPage, totalPosts, paginate }) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <>
            <Pagination style={{ justifyContent: 'center', display: 'flex' }} count={pageNumbers.length} onClick={(e) => paginate(e.target.innerText)} color='primary' hidePrevButton hideNextButton  size='large' />
        </>
    )
};

export default PaginationFooter;
