import { useState,useMemo, useEffect } from 'react';
import users from './User_data_json/users.json';
import Pagination from './Pagination';
import { useSearchParams } from 'react-router-dom';


let PageSize = 6;

function Employee() {
  const [userData, setUser] = useState(users || []);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectFilterType, setSelectFilterType] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return userData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  const options = [
    {
      label: "Filter",
      value: "",
    },
    {
      label: "Name",
      value: "name",
    },
    {
      label: "Position",
      value: "position",
    },
    {
      label: "Office",
      value: "office",
    },
  ];

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);

    if (searchInput !== '' && selectFilterType === '') {
      const filteredData = userData.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredResults(filteredData);
    } else if (searchInput !== '' && selectFilterType !== '') {
      const filteredData = userData.filter((item) => {
        return Object.values(item[selectFilterType]).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(userData);
    }
  }

  const handleChange = (e) => {
    setSelectFilterType(e.target.value);
  }

  useEffect(() => {
    setSearchParams({'page': currentPage})
  }, [currentPage])

  return (
    <div className="App">
      <form className="search-box">
        <input type="text" className='icon-rtl' onChange={(e) => searchItems(e.target.value)} placeholder="Search.." name="search2" />
      </form>

      <div class="mybox">
        <span class="myarrow"></span>
        <select value={selectFilterType} onChange={handleChange}>
          {options.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      <table id="customers">
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Office</th>
        </tr>
        {
          searchInput.length > 1 ? (
            filteredResults?.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.position}</td>
                <td>{user.office}</td>
              </tr>
            ))
          ) : (
            currentTableData?.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.position}</td>
                <td>{user.office}</td>
              </tr>
            ))
          )
        }
      </table>

      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={userData.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
      
    </div>
  );
}

export default Employee;
