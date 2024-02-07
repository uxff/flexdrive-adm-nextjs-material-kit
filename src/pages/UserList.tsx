import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import CoverOne from '../images/cover/cover-01.png';
import userSix from '../images/user/user-06.png';
import { useQuery } from 'react-query';
import { useState } from "react";
// works ok

const UserList = () => {

  const [page, setPage] = React.useState(1);

  const fetchUserList = (page: number, perPage: number) => {
    // const [issues, org, repo, {page, perPage}] = queryKey;
    const url = `http://192.168.164.129:10010/admapi/user/list?page=${page}&pageSize=${perPage}`;
    return fetch(url, {
      credentials: 'include',
      mode: 'cors',
      headers: {
        'API-Token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncGEiOiIxLjAuMTcwNDUwMzEwMCJ9.bUXrqlMau9-bWPjYZiiTsBttca8cPWX4seAhC5Ac69A',
        // Cookie:'gpa=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncGEiOiIxLjAuMTcwNDAyNzQzMSJ9.KTDDriAR0RnscDyM0WCgiHIvnrcNScxS_ZCKGjh3FoI' // does not work
      }}).then(res => res.json());
  }
  

  const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
    isPreviousData,
  } = useQuery({
    queryKey: ['page', page],
    queryFn: () => fetchUserList(page, 2),
    keepPreviousData : true
  });

  return (
    <>
      {/* <p>This is UserList in QueryClientProvider</p> */}
      <Breadcrumb pageName="UserList" />
      <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          This should be the list data: {data.result.list.length}
          {data.result.list.map((item) => (
            <p key={item.Id}>{item.Email}</p>
          ))}
        </div>
      )}
      <span>Current Page: {page + 1}</span>
      <button
        onClick={() => setPage(old => Math.max(old - 1, 0))}
        disabled={page === 0}
      >
        Previous Page
      </button>{' '}
      <button
        onClick={() => {
          if (!isPreviousData && data.hasMore) {
            setPage(old => old + 1)
          }
        }}
        // Disable the Next Page button until we know a next page is available
        disabled={isPreviousData || !data?.hasMore}
      >
        Next Page
      </button>
      {isFetching ? <span> Loading...</span> : null}{' '}

    </div>
    </>
  );
};

export default UserList;
