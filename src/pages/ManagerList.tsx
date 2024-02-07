import React, { Component } from "react";
// import {useTable} from 'react-table';
import Breadcrumb from '../components/Breadcrumb';
import { Link } from "react-router-dom";

// const GetManagerList = () => {
//   fetch('http://localhost:3000/admapi/manager/list')
//     .then(response => response.json())
//     .then(data => console.log(data));
// };

class ManagerList extends Component {
  state = {
    apiResult: null,
    isLogin: false
  }
  componentDidMount() {
    // login at first
    // fetch('http://192.168.164.129:10010/admapi/login', {
    //   credentials: 'include',
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     email: 'admin@admin.com',
    //     password: '123456',
    //     captcha: '000000'
    // })})
    //   .then(response => response.json())
    //   .then(data => {
    //     this.setState({
    //       isLogin: data? data.IsLogin: false
    //     })
    //   })
    //   .catch(error => console.error(error));

    // then get manager list
    fetch('http://192.168.164.129:10010/admapi/manager/list', {
        credentials: 'include',
        mode: 'cors',
        headers: {
          'API-Token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncGEiOiIxLjAuMTcwNDAyNzQzMSJ9.KTDDriAR0RnscDyM0WCgiHIvnrcNScxS_ZCKGjh3FoI',
          // Cookie:'gpa=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncGEiOiIxLjAuMTcwNDAyNzQzMSJ9.KTDDriAR0RnscDyM0WCgiHIvnrcNScxS_ZCKGjh3FoI' // does not work
        }
      })
      .then(response => response.json())
      .then(data =>
        this.setState({
          apiResult: data
        })
      )
      .catch(error => console.error(error));
  }

  loadData() {
    //
  }

  render() {
    const { apiResult, isLogin } = this.state;
    // const { isLogin } = this.state;

    // fetch('http://192.168.164.129:10010/admapi/login', {
    //   credentials: 'include',
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     email: 'admin@admin.com',
    //     password: '123456',
    //     captcha: '000000'
    // })})
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log('in login:');
    //     console.log(data);
    //   })
    //   .catch(error => console.error(error));

    return (
      <>
       <Breadcrumb pageName="ManagerList" />

       <div className="flex flex-col gap-10">
          <div className="ManagerList">
            <p>isLogin: {isLogin}</p>
            {apiResult ? (
              
              <div>
                <p>errcode: {apiResult.errcode} errmsg: {apiResult.errmsg}</p>
                <p>requestId: {apiResult.requestId}</p>
                <p>result.pageSize: {apiResult.result?apiResult.result.pageSize:10} 
                  result.page: {apiResult.result?apiResult.result.page:1}
                  result.total: {apiResult.result?apiResult.result.total:0}
                  emails: {apiResult.result?apiResult.result.list.map((item)=>{return <p>{item.mid}</p>}):(<></>)}
                </p>
                {/* we need table and pagination: https://tailwindui.com/components/application-ui/navigation/pagination */}
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <a href="#" className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                    </svg>
                  </a>
                  {/* <!-- Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" --> */}
                  <a href="#" aria-current="page" className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">1</a>
                  <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">2</a>
                  <a href="#" className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">3</a>
                  <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
                  <a href="#" className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">8</a>
                  <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">9</a>
                  <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">10</a>
                  <a href="#" className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                    </svg>
                  </a>
                </nav>
                {/* table */}
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                  <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                      <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                          <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">mid</th>
                          <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Email</th>
                          <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Role</th>
                          <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">LastLoginAt</th>
                          <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Status</th>
                          <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                      {apiResult.result?(apiResult.result.list.map((item)=>{
                        return <tr>
                          <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">{item.mid}</td>
                          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{item.email}</td>
                          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{item.roleName}({item.roleId}) </td>
                          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{item.lastLoginAt}</td>
                          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{item.status}</td>
                          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <p className="text-primary hover:text-primary-dark cursor-pointer">Edit</p>
                          </td>
                        </tr>
                        })):(<tr><td>No records.</td></tr>)
                      }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </>
    );
  }
};

// const ManagerList = () => {
//   return (
//     <>
//       <Breadcrumb pageName="ManagerList" />

//       <div className="flex flex-col gap-10">
//         {/* manager list table here */}
//       </div>
//     </>
//   );
// };

export default ManagerList;
