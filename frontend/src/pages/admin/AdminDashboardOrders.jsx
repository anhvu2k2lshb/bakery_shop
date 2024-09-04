import React, { useEffect } from "react";
import AdminHeader from "../../components/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfAdmin } from "../../redux/actions/order";

const AdminDashboardOrders = () => {
  const dispatch = useDispatch();

  const { adminOrders, adminOrderLoading } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
  }, []);

  const columns = [
    { field: "id", headerName: "Mã đơn hàng", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Đã giao thành công"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Số lượng",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Tổng tiền",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
        field: "createdAt",
        headerName: "Ngày đặt hàng",
        type: "number",
        minWidth: 130,
        flex: 0.8,
      },
  ];

  const row = [];
  const orderStatus = {
    "Processing": "Đang xử lý",
    "Transferred to delivery partner": "Đã bàn giao cho đơn vị vận chuyển",
    "Shipping": "Đang vận chuyển",
    "Received": "Đã nhận hàng",
    "On the way": "Đang trên đường giao",
    "Delivered": "Đã giao thành công"
};
  adminOrders &&
    adminOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item?.cart?.reduce((acc, item) => acc + item.qty, 0),
        total: item?.totalPrice.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
        status: orderStatus[item?.status],
        createdAt: item?.createdAt.slice(0,10),
      });
    });
    const styles = `
  .greenColor {
    background-color: lightgreen !important;
  }
  .redColor {
    background-color: lightcoral !important;
  }
`;
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={2} />
          </div>

          <div className="w-full min-h-[45vh] pt-5 rounded flex justify-center">
            <div className="w-[97%] flex justify-center">
            <style>{styles}</style>
              <DataGrid
                rows={row}
                columns={columns}
                pageSize={4}
                disableSelectionOnClick
                autoHeight
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardOrders;
