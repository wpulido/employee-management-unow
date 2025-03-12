"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, Modal, TextInput, Alert } from "flowbite-react";
import { Employee } from "server/types";
import {useRouter} from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

const Dashboard = () => {
  const router = useRouter();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [positions, setPositions] = useState<string[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState<Omit<Employee, "_id">>({
    name: "",
    lastName: "",
    position: "",
    birthDate: "",
  });

  useEffect(() => {
    fetchEmployees();
    fetchPositions();
  }, []);


  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const response = await fetch(`${API_URL}/employees`, {
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();
      setEmployees(data);
      setFilteredEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchPositions = async () => {
    try {
      const response = await fetch(`${API_URL}/positions`);
      const data = await response.json();
      setPositions(data.positions);
    } catch (error) {
      console.error("Error fetching positions:", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateEmployee = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const formattedData = {
        ...formData,
        birthDate: new Date(formData.birthDate).toISOString(),
      };

      const response = await fetch(`${API_URL}/employees`, {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return;
      }

      const data = await response.json();
      setShowCreateModal(false);
      setFormData({ name: "", lastName: "", position: "", birthDate: "" });
      await fetchEmployees();
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  const handleUpdateEmployee = async () => {
    if (!selectedEmployee) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const response = await fetch(`${API_URL}/employees/${selectedEmployee._id}`, {
        method: "PUT",
        headers: {
          Authorization: token,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) console.error("Error updating employee");
      setShowUpdateModal(false);
      await fetchEmployees();
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleDeleteEmployee = async () => {
    if (!selectedEmployee) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const response = await fetch(`${API_URL}/employees/${selectedEmployee._id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });
      if (!response.ok) console.error("Error deleting employee");
      setShowDeleteModal(false);
      await fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const logOut = async () => {
    const response = await fetch(`${API_URL}/logout`, {
      method: "POST"
    })
    const data = await response.json();
    if(response.ok) {
      localStorage.clear();
      router.push("/login");
    }
  }

  return (
    <div className="p-4">
      <div className={"flex justify-between items-center"}>
        <h2 className={"text-black font-bold text-3xl"}>Employee management</h2>
        <div className="flex justify-between gap-4">
          <Button color={"blue"} className={"text-white"} onClick={() => setShowCreateModal(true)}>
            Create employee
          </Button>

          <Button className={"text-white"} color={"dark"} onClick={logOut}>Logout</Button>
        </div>
      </div>

      {filteredEmployees.length > 0 ? (
        <Table className="mt-10" >
          <Table.Head>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Last name</Table.HeadCell>
            <Table.HeadCell>Position</Table.HeadCell>
            <Table.HeadCell>Birth date</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {filteredEmployees?.map((employee) => (
              <Table.Row key={employee._id}>
                <Table.Cell>{employee.name}</Table.Cell>
                <Table.Cell>{employee.lastName}</Table.Cell>
                <Table.Cell>{employee.position}</Table.Cell>
                <Table.Cell>{employee.birthDate ? new Date(employee.birthDate).toLocaleDateString() : "N/A"}</Table.Cell>
                <Table.Cell className={"flex"}>
                  <Button
                    color="blue"
                    onClick={() => {
                      setSelectedEmployee(employee);
                      setFormData(employee);
                      setShowUpdateModal(true);
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    color="red"
                    onClick={() => {
                      setSelectedEmployee(employee);
                      setShowDeleteModal(true);
                    }}
                    className="ml-2"
                  >
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <Alert color="info" className={"text-black"}>No employees registered.</Alert>
      )}

      <Modal show={showCreateModal} onClose={() => setShowCreateModal(false)}>
        <Modal.Header>Create employee</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <TextInput name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
            <TextInput name="lastName" placeholder="Last name" value={formData.lastName} onChange={handleInputChange} />
            <select name="position" value={formData.position} onChange={handleInputChange} className="w-full p-2 border rounded text-black">
              <option className={"text-black"} value="">
                Select position
              </option>
              {positions.map((position) => (
                <option className={"text-black"} key={position} value={position}>
                  {position}
                </option>
              ))}
            </select>
            <TextInput name="birthDate" type="date" value={formData.birthDate} onChange={handleInputChange} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className={"text-white"} color={"blue"} onClick={handleCreateEmployee}>
            Create
          </Button>
          <Button color="gray" onClick={() => setShowCreateModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showUpdateModal} onClose={() => setShowUpdateModal(false)}>
        <Modal.Header>Update employee</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <TextInput name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
            <TextInput name="lastName" placeholder="Last name" value={formData.lastName} onChange={handleInputChange} />
            <select name="position" value={formData.position} onChange={handleInputChange} className="w-full p-2 border rounded text-black">
              <option className={"text-black"} value="">Select position</option>
              {positions.map((position) => (
                <option className={"text-black"} key={position} value={position}>
                  {position}
                </option>
              ))}
            </select>
            <TextInput name="birthDate" type="date" value={formData.birthDate} onChange={handleInputChange} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color={"blue"} className={"text-black"} onClick={handleUpdateEmployee}>
            Update
          </Button>
          <Button color="gray" onClick={() => setShowUpdateModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <Modal.Header>Delete employee</Modal.Header>
        <Modal.Body>
          <p className={"text-black"}>Are you sure you want to delete {selectedEmployee?.name}?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className={"text-white"} color="failure" onClick={handleDeleteEmployee}>
            Delete
          </Button>
          <Button className={"text-white"} color="dark" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
