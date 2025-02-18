import { Button, Form, Input, message, Modal, Spin, Tag } from "antd";
import TableComponent from "./Table";
import { LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";
import { data } from "react-router-dom";

function Home() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
  });
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onFinish = async (values) => {
    console.log("Submitting values:", values); // إضافة تصحيح

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append(name, values.name);
      formData.append("phone_number", values.phone_number);

      axios
        .post(
          "https://backend.vegus.furatgroup.nl/api/storeMissing",
          {
            body: {
              name: values?.name,
              phone_number: values?.phone_number,
            },
          },
          {
            redirect: "follow",
          }
        )
        .then((response) => console.log(response.data))
        .catch((error) => console.error(error));
      // console.log("Response:", response); // إضافة تصحيح
      message.success("تم إرسال البيانات بنجاح!");
      onClose();
    } catch (error) {
      console.error("Error:", error); // طباعة الخطأ للتصحيح
      message.error("حدث خطأ أثناء إرسال البيانات. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {/* Header */}
      <header className="border-b-2 border-gray-300 p-3">
        <h1 className="text-gray-900 text-center font-semibold">
          عرض بيانات السجناء
        </h1>
      </header>

      <div>
        <Tag
          bordered={false}
          color="processing"
          className="w-full p-4 text-center my-2 text-lg max-[600px]:text-[14px] text-wrap text-blue-700"
        >
          قم بإدخال الاسم الذي تبحث عنه او الكنية في حقل البحث وعند وجود الاسم
          التواصل مع قسم إدارة العمليات عبر الرقم{" "}
          <span>
            <a href="tel:+00905528052711" className="underline text-blue-700">
              00905528052711
            </a>
          </span>
        </Tag>
        {/* <Tag
          bordered={false}
          color="green"
          className="w-full p-4 text-center flex justify-around items-center text-[16px] max-[600px]:text-[12px] max-[600px]:flex-col text-wrap "
        >
          <p>
            في حال عدم العثور على الاسم في الجدول قم بإضافته مع رقم واتساب
            للتنبيه عند إضافته
          </p>
          <button
            onClick={() => {
              showDrawer(visible);
            }}
            className="py-2 px-4  bg-green-700 text-white font-bold rounded-md shadow-md max-[600px]:w-1/2 max-[600px]:m-4"
          >
            إضافة
          </button>
        </Tag> */}
      </div>
      <div>
        <TableComponent />
      </div>
      <Modal
        title="إدخال البيانات"
        open={visible}
        onCancel={onClose}
        footer={[]}
      >
        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          form={form}
          initialValues={formData}
        >
          <Form.Item
            label="الاسم"
            name="name"
            rules={[{ required: true, message: "يرجى إدخال الاسم!" }]}
          >
            <Input
              placeholder="أدخل الاسم الذي تبحث عنه"
              size="large"
              className="text-gray-900"
            />
          </Form.Item>

          <Form.Item
            label="رقم الهاتف"
            name="phone_number"
            rules={[{ required: true, message: "يرجى إدخال الرقم!" }]}
          >
            <Input
              placeholder="أدخل رقمك هنا"
              size="large"
              className="text-gray-900"
            />
          </Form.Item>
          <div className="flex justify-between my-4 gap-5 ">
            <Button key="cancel" onClick={onClose} className="w-full">
              إلغاء
            </Button>

            <Button
              htmlType="submit"
              type="primary"
              onClick={onFinish}
              className="w-full"
            >
              {loading ? (
                <span>
                  <Spin
                    indicator={<LoadingOutlined spin />}
                    size="small"
                    className="text-white"
                  />
                </span>
              ) : (
                "إرسال"
              )}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default Home;
