import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import { MdBorderClear } from "react-icons/md";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfAdmin } from "../../redux/actions/order";
import Loader from "../Layout/Loader";
import { getAllSellers } from "../../redux/actions/sellers";

const AdminDashboardMain = () => {
  const dispatch = useDispatch();

  const { adminOrders, adminOrderLoading } = useSelector(
    (state) => state.order
  );
  const { sellers } = useSelector((state) => state.seller);

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
    dispatch(getAllSellers());
  }, []);

  const adminEarning =
    adminOrders &&
    adminOrders.reduce((acc, item) => acc + item.totalPrice * 0.1, 0);

  const adminBalance = Number(adminEarning?.toFixed(2)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

  const columns = [
    { field: "id", headerName: "Mã đơn hàng", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 130,
      flex: 1.4,
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
    "Received": "Đơn hàng đã đến trạm gần địa chỉ bạn cung cấp",
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
        createdAt: item?.createdAt.slice(0, 10),
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
    <>
      {adminOrderLoading ? (
        <Loader />
      ) : (
        <div className="w-full p-4">
          <h3 className="text-[22px] font-Poppins pb-2">Dashboard</h3>
          <div className="w-full block 800px:flex items-center justify-between">
            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <AiOutlineMoneyCollect
                  size={30}
                  className="mr-2"
                  fill="#00000085"
                />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                >
                  Tổng tiền
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                {adminBalance}
              </h5>
            </div>

            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <MdBorderClear size={30} className="mr-2" fill="#00000085" />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                >
                  Tổng người bán
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                {sellers && sellers.length}
              </h5>
              <Link to="/admin-sellers">
                <h5 className="pt-4 pl-2 text-[#077f9c]">Xem tất cả</h5>
              </Link>
            </div>

            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <AiOutlineMoneyCollect
                  size={30}
                  className="mr-2"
                  fill="#00000085"
                />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                >
                  Tổng đơn hàng
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                {adminOrders && adminOrders.length}
              </h5>
              <Link to="/admin-orders">
                <h5 className="pt-4 pl-2 text-[#077f9c]">Xem tất cả</h5>
              </Link>
            </div>
          </div>

          <br />
          <h3 className="text-[22px] font-Poppins pb-2">Đơn hàng gần nhất</h3>
          <div className="w-full min-h-[45vh] bg-white rounded">
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
      )}
    </>
  );
};

export default AdminDashboardMain;
