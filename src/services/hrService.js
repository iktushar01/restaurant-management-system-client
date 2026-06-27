import apiClient from "./apiClient";

const BASE = "/api/v1/hr";

export const hrService = {
  designations: {
    getAll: (params) => apiClient(`${BASE}/designations`, { params }),
    getById: (id) => apiClient(`${BASE}/designations/${id}`),
    create: (data) => apiClient(`${BASE}/designations`, { method: "POST", body: data }),
    update: (id, data) => apiClient(`${BASE}/designations/${id}`, { method: "PATCH", body: data }),
    delete: (id) => apiClient(`${BASE}/designations/${id}`, { method: "DELETE" }),
  },
  earningHeads: {
    getAll: (params) => apiClient(`${BASE}/earning-heads`, { params }),
    getById: (id) => apiClient(`${BASE}/earning-heads/${id}`),
    create: (data) => apiClient(`${BASE}/earning-heads`, { method: "POST", body: data }),
    update: (id, data) => apiClient(`${BASE}/earning-heads/${id}`, { method: "PATCH", body: data }),
    delete: (id) => apiClient(`${BASE}/earning-heads/${id}`, { method: "DELETE" }),
  },
  deductionHeads: {
    getAll: (params) => apiClient(`${BASE}/deduction-heads`, { params }),
    getById: (id) => apiClient(`${BASE}/deduction-heads/${id}`),
    create: (data) => apiClient(`${BASE}/deduction-heads`, { method: "POST", body: data }),
    update: (id, data) => apiClient(`${BASE}/deduction-heads/${id}`, { method: "PATCH", body: data }),
    delete: (id) => apiClient(`${BASE}/deduction-heads/${id}`, { method: "DELETE" }),
  },
  employees: {
    getAll: (params) => apiClient(`${BASE}/employees`, { params }),
    getById: (id) => apiClient(`${BASE}/employees/${id}`),
    create: (data) => apiClient(`${BASE}/employees`, { method: "POST", body: data }),
    update: (id, data) => apiClient(`${BASE}/employees/${id}`, { method: "PATCH", body: data }),
    delete: (id) => apiClient(`${BASE}/employees/${id}`, { method: "DELETE" }),
  },
  earnings: {
    getAll: (employeeId, params) => apiClient(`${BASE}/employees/${employeeId}/earnings`, { params }),
    getById: (employeeId, id) => apiClient(`${BASE}/employees/${employeeId}/earnings/${id}`),
    create: (employeeId, data) => apiClient(`${BASE}/employees/${employeeId}/earnings`, { method: "POST", body: data }),
    update: (employeeId, id, data) => apiClient(`${BASE}/employees/${employeeId}/earnings/${id}`, { method: "PATCH", body: data }),
    delete: (employeeId, id) => apiClient(`${BASE}/employees/${employeeId}/earnings/${id}`, { method: "DELETE" }),
  },
  deductions: {
    getAll: (employeeId, params) => apiClient(`${BASE}/employees/${employeeId}/deductions`, { params }),
    getById: (employeeId, id) => apiClient(`${BASE}/employees/${employeeId}/deductions/${id}`),
    create: (employeeId, data) => apiClient(`${BASE}/employees/${employeeId}/deductions`, { method: "POST", body: data }),
    update: (employeeId, id, data) => apiClient(`${BASE}/employees/${employeeId}/deductions/${id}`, { method: "PATCH", body: data }),
    delete: (employeeId, id) => apiClient(`${BASE}/employees/${employeeId}/deductions/${id}`, { method: "DELETE" }),
  },
  basicSalaries: {
    getAll: (employeeId, params) => apiClient(`${BASE}/employees/${employeeId}/basic-salaries`, { params }),
    getById: (employeeId, id) => apiClient(`${BASE}/employees/${employeeId}/basic-salaries/${id}`),
    create: (employeeId, data) => apiClient(`${BASE}/employees/${employeeId}/basic-salaries`, { method: "POST", body: data }),
    update: (employeeId, id, data) => apiClient(`${BASE}/employees/${employeeId}/basic-salaries/${id}`, { method: "PATCH", body: data }),
    delete: (employeeId, id) => apiClient(`${BASE}/employees/${employeeId}/basic-salaries/${id}`, { method: "DELETE" }),
  },
  salaryPayments: {
    getAll: (employeeId, params) => apiClient(`${BASE}/employees/${employeeId}/salary-payments`, { params }),
    getById: (employeeId, id) => apiClient(`${BASE}/employees/${employeeId}/salary-payments/${id}`),
    create: (employeeId, data) => apiClient(`${BASE}/employees/${employeeId}/salary-payments`, { method: "POST", body: data }),
    update: (employeeId, id, data) => apiClient(`${BASE}/employees/${employeeId}/salary-payments/${id}`, { method: "PATCH", body: data }),
    delete: (employeeId, id) => apiClient(`${BASE}/employees/${employeeId}/salary-payments/${id}`, { method: "DELETE" }),
  },
  salaryPayable: {
    getAll: (params) => apiClient(`${BASE}/salary-payable`, { params }),
  },
  grandSalaryPayable: {
    get: (params) => apiClient(`${BASE}/grand-salary-payable`, { params }),
  },
};
