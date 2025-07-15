import api from "../config/interceptor.js";
const BASE_URL = import.meta.env.VITE_SPRING_API_URL;

export function findAll(page=0,sortField="fulllName",sortDirection = "ASC"){
    const token = localStorage.getItem('authToken');
    return api.get(`${BASE_URL}/employee/list?page=${page}&sortBy=${sortField}&sortDirection=${sortDirection}`,
        {
          headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
          }
        });
}

export function create(payload){
    const token = localStorage.getItem('authToken');
    return api.post(`${BASE_URL}/empoyee/create`,{
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        }
    });
}

export function findEmployeeBy(sortField="fullname",sortDirection="ASC",keyword){
  const token = localStorage.getItem('authToken');
  return api.get(`${BASE_URL}/employee/findBy?sortBy=${sortField}&sortDirection=${sortDirection}&keyword=${keyword}`,
  {
    headers:{
      'Content-Type':'application/json',
      'Authorization':`Bearer ${token}`
    }
  });
}

export function findEmployeeByDepartment(sortField="fullname",sortDirection="ASC",department){
  const token = localStorage.getItem('authToken');
  return api.get(`${BASE_URL}/employee/findByDepartment?sortBy=${sortField}&sortDirection=${sortDirection}&keyword=${department}`,
  {
    headers:{
      'Content-Type':'applicaction/json',
      'Authorization':`Bearer ${token}`
    }
  });
}

export function findEmployeeByJob(sortField="fullname",sortDirection="ASC",job){
  const token = localStorage.getItem('authToken');
  return api.get(`${BASE_URL}/employee/findByJob?sortBy=${sortField}&sortDirection=${sortDirection}&keyword=${job}`,
  {
    headers:{
      'Content-Type':'application/json',
      'Authorization':`Bearer ${token}`
    }
  });
}