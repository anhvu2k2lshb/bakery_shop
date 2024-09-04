import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { MdBorderClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { getAllProductsShop } from "../../redux/actions/product";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { viVN } from "../../Assets/locale/viVN";

const DashboardHero = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
     dispatch(getAllOrdersOfShop(seller._id));
     dispatch(getAllProductsShop(seller._id));
  }, [dispatch]);

  const availableBalance = Number(seller?.availableBalance.toFixed(2)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

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
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "Xem chi tiết",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];
  const orderStatus = {
    "Processing": "Đang xử lý",
    "Transferred to delivery partner": "Đã bàn giao cho đơn vị vận chuyển",
    "Shipping": "Đang vận chuyển",
    "Received": "Đơn hàng đã đến trạm gần địa chỉ bạn cung cấp",
    "On the way": "Đang trên đường giao, vui lòng chú ý điện thoại",
    "Delivered": "Đã giao thành công"
};
  orders && orders.forEach((item) => {
    row.push({
        id: item._id,
        itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
        total: Number(item.totalPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
        status: orderStatus[item.status]
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
    <div className="w-full p-8 h-[80vh] overflow-y-scroll">
      <h3 className="text-[22px] font-Poppins pb-2">Thống kê</h3>
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
              Doanh thu{" "}
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{availableBalance}</h5>
          
        </div>

        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <MdBorderClear size={30} className="mr-2" fill="#00000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              Tổng đơn hàng
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{orders && orders.length}</h5>
          <Link to="/dashboard-orders">
            <h5 className="pt-4 pl-2 text-[#077f9c]">Xem các đơn hàng</h5>
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
              Tổng sản phẩm
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{products && products.length}</h5>
          <Link to="/dashboard-products">
            <h5 className="pt-4 pl-2 text-[#077f9c]">Xem các sản phẩm</h5>
          </Link>
        </div>
      </div>
      <br />
      <h3 className="text-[22px] font-Poppins pb-2">Đơn hàng gần đây</h3>
      <div className="w-full min-h-[45vh] bg-white rounded">
      <style>{styles}</style>
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
        localeText={viVN}
      />
      </div>
    </div>
  );
};

export default DashboardHero;
