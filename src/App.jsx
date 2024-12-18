import { useState } from "react";
import { Modal, Button, Dropdown, Menu, Form, Input } from "antd";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const App = () => {
  // Initial table data
  const [rows, setRows] = useState([
    { id: 1, name: "John Doe", age: 28, country: "USA" },
    { id: 2, name: "Jane Smith", age: 34, country: "Canada" },
    { id: 3, name: "Alice Brown", age: 23, country: "UK" },
    { id: 4, name: "Bob Johnson", age: 45, country: "Australia" },
  ]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [form] = Form.useForm();

  const showModal = (action) => {
    setActionType(action);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    if (actionType === "delete") {
      setRows(rows.filter((row) => !selectedRows.includes(row)));
    } else if (actionType === "update") {
      const updatedRows = rows.map((row) => {
        if (selectedRows.includes(row)) {
          return {
            ...row,
            name: form.getFieldValue("newName") || row.name,
            age: form.getFieldValue("newAge") || row.age,
            country: form.getFieldValue("newCountry") || row.country,
          };
        }
        return row;
      });
      setRows(updatedRows);
    }
    setSelectedRows([]);
    setIsModalVisible(false);
    form.resetFields();
  };

  const columns = [
    { headerName: "ID", field: "id", checkboxSelection: true },
    { headerName: "Name", field: "name", editable: true },
    { headerName: "Age", field: "age", editable: true },
    { headerName: "Country", field: "country", editable: true },
  ];

  const menu = (
    <Menu>
      <Menu.Item onClick={() => showModal("delete")}>Delete Selected</Menu.Item>
      <Menu.Item onClick={() => showModal("update")}>Update Selected</Menu.Item>
    </Menu>
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Update/Delete Actions</h1>

      <Dropdown overlay={menu} trigger={["click"]}>
        <Button
          type="primary"
          disabled={selectedRows.length === 0}
          style={{ marginBottom: "10px" }}
        >
          Bulk Actions
        </Button>
      </Dropdown>

      <div
        className="ag-theme-alpine"
        style={{ height: 250, width: "50%", marginBottom: "20px" }}
      >
        <AgGridReact
          rowData={rows}
          columnDefs={columns}
          rowSelection="multiple"
          onSelectionChanged={(params) =>
            setSelectedRows(params.api.getSelectedRows())
          }
        />
      </div>

      <Modal
        title={`Confirm ${actionType === "delete" ? "Deletion" : "Update"}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={actionType === "delete" ? "Yes, Delete" : "Yes, Update"}
        cancelText="Cancel"
      >
        {actionType === "delete" && (
          <p>Are you sure you want to delete the selected rows?</p>
        )}

        {actionType === "update" && (
          <Form form={form} layout="vertical">
            <Form.Item label="New Name" name="newName">
              <Input />
            </Form.Item>
            <Form.Item label="New Age" name="newAge">
              <Input />
            </Form.Item>
            <Form.Item label="New Country" name="newCountry">
              <Input />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default App;
