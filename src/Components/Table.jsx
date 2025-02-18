import { useState } from "react";
import { Table, Input } from "antd";
import Highlighter from "react-highlight-words";

import { data } from "../../data";

const TableComponent = () => {
  const [searchText, setSearchText] = useState("");
  // const [data, setData] = useState();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await axios
  //         .get("https://backend.vegus.furatgroup.nl/api/all")
  //         .then((response) => setData(response.data.data));
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredData = data?.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );
  const columns = [
    {
      title: "الاسم",
      dataIndex: "name",
      render: (text) => (
        <Highlighter
          highlightClassName="YourHighlightClass"
          searchWords={[searchText]}
          autoEscape={true}
          textToHighlight={text ? text.toString() : ""}
        />
      ),
      width: "80%",
    },
    {
      title: " ",
      dataIndex: "date",
      width: "20%",
    },
  ];
  const { Search } = Input;
  return (
    <div className="mx-auto my-3 w-[80%]">
      <Search
        size="large"
        className="p-4"
        placeholder="البحث عن البيانات"
        value={searchText}
        onChange={handleSearch}
        style={{ marginBottom: 16 }}
      />
      <Table
        columns={columns}
        page
        bordered
        dataSource={filteredData}
        className="m-auto"
        pagination={{
          position: ["bottomCenter"], // مركز الترقيم
          style: { textAlign: "center" }, // لتوسيع مساحة الترقيم
          pageSize: 50, // عدد الصفوف في كل صفحة
          showSizeChanger: true, // لإظهار خيار تغيير حجم الصفحة
          pageSizeOptions: [50, 100], // خيارات لحجم الصفحة
        }}
      />
    </div>
  );
};

export default TableComponent;
