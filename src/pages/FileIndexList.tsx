import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
// import CoverOne from '../images/cover/cover-01.png';
// import userSix from '../images/user/user-06.png';
import { useQuery } from 'react-query';
// import { useState } from "react";

import { Pagination } from 'flowbite-react';
import { Table } from 'flowbite-react';

const FileIndexList = () => {

  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const perPage = 2;
  const pageCount = Math.ceil(total/perPage)?Math.ceil(total/perPage):1;

  const fetchFileList = (page: number, perPage: number) => {
    // const [issues, org, repo, {page, perPage}] = queryKey;
    const url = `http://192.168.164.129:10010/admapi/fileindex/list?page=${page}&pagesize=${perPage}`;
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
    queryFn: () => fetchFileList(page, perPage),
    keepPreviousData : true
  });

  // const handlePageClick = (event) => {
  //   const newOffset = 0; //(event.selected * perPage) % items.length;
  //   console.log('event=', event);
  //   console.log(
  //     `User requested page number ${event.selected}, which is offset ${newOffset}`
  //   );
  //   // setItemOffset(newOffset);
  // };

  return (
    <>
      {/* <p>This is UserList in QueryClientProvider</p> */}
      <Breadcrumb pageName="FileIndexList" />
      <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          This should be the list data: {data.result.list.length}
          {data.result.list.map((item) => (
            <p key={item.Id}>{item.FileName}</p>
          ))}
        </div>
      )}
      <span>Current Page: {page}, perPage: {perPage}</span>

      <button
        onClick={() => {
          setPage(old => Math.max(old - 1, 1));
          console.log('will go to previous page, page: ' + page);
        }}
        disabled={page === 0 || page === 1}
      >
        Previous Page
      </button>{' '}

      <button
        onClick={() => {
          // if (!isPreviousData && data.page*perPage <= data.result.list.length) {
          if (page*perPage < data.result.total) {
            setPage(old => old + 1);
            console.log('will go to next page, page: ' + page);
          }
        }}
        // Disable the Next Page button until we know a next page is available
        disabled={!data || !data.result || data.result.list.length === 0}
      >
        Next Page
      </button>
      {isFetching ? <span> Loading...</span> : null}{' '}

    </div>
      CurPage: {page} Total Pages: {pageCount} Total: {data?data.result.total:0}
      {/* ReactPaginate ok, but ugly  */}

      {/* Fuck, cannot define my own css by tailwind */}

      {/* use flowbite. like button. it seems css conflicts. dom exists but text disappears. */}
      <div className="overflow-x-auto bg-white">
        <Table striped>
          <Table.Head className="bg-gray-50 dark:bg-gray-700">
            <Table.HeadCell>File name</Table.HeadCell>
            <Table.HeadCell>Hash</Table.HeadCell>
            <Table.HeadCell>At Nodes</Table.HeadCell>
            <Table.HeadCell>Size</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Updated</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data ? data.result.list.map((item) => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                {/* <Table.Cell>{item.Id}</Table.Cell> */}
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{item.FileName}</Table.Cell>
                <Table.Cell>{item.FileHash}</Table.Cell>
                <Table.Cell>{item.NodeId},{item.NodeId2},{item.NodeId3}</Table.Cell>
                <Table.Cell>{item.Size}</Table.Cell>
                <Table.Cell>{item.Status}</Table.Cell>
                <Table.Cell>{item.Updated}</Table.Cell>
                <Table.Cell>
                  <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                    Edit
                  </a>
                </Table.Cell>
              </Table.Row>
            )):(
              // 没有数据
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="colspan-10">
                  {'No data found'}
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination currentPage={page} totalPages={data?Math.ceil(data.result.total/perPage):0} onPageChange={(page: number)=>{setPage(page)}} />
      </div>
    </>
  );
};

export default FileIndexList;
