import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  const orderUpdateHandler = async (e) => {
    await axios
      .put(
        `${server}/order/update-order-status/${id}`,
        {
          status,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Cập nhật đơn hàng thành công");
        
        navigate("/dashboard-orders");
        window.location.reload(true);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const refundOrderUpdateHandler = async (e) => {
    await axios
    .put(
      `${server}/order/order-refund-success/${id}`,
      {
        status,
      },
      { withCredentials: true }
    )
    .then((res) => {
      toast.success("Cập nhật đơn hàng thành công");
      window.location.reload(true);
      dispatch(getAllOrdersOfShop(seller._id));
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
  }

  const orderStatus = {
    "Processing": "Đang xử lý",
    "Transferred to delivery partner": "Đã bàn giao cho đơn vị vận chuyển",
    "Shipping": "Đang vận chuyển",
    "Received": "Đơn hàng đã đến trạm gần địa chỉ bạn cung cấp",
    "On the way": "Đang trên đường giao, vui lòng chú ý điện thoại",
    "Delivered": "Đã giao thành công"
};

  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px]">Order Details</h1>
        </div>
        <Link to="/dashboard-orders">
          <div
            className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}
          >
            Về dashboard
          </div>
        </Link>
      </div>

      <div className="w-full flex items-center justify-between pt-6">
        <h5 className="text-[#00000084]">
          Mã đơn hàng: <span>#{data?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000084]">
          Trạng thái đơn hàng: <span>{orderStatus[data?.status]}</span>
        </h5>
        <h5 className="text-[#00000084]">
          Thời gian đặt hàng: <span>{data?.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>

      {/* order items */}
      <br />
      <br />
      {data &&
        data?.cart.map((item, index) => (
          <div className="w-full flex items-start mb-5">
            <img
              src={`${item.images[0]?.url}`}
              alt=""
              className="w-[80x] h-[80px]"
            />
            <div className="w-full">
              <h5 className="pl-3 text-[20px]">{item.name}</h5>
              <h5 className="pl-3 text-[20px] text-[#00000091]">
                {(item.discountPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} x {item.qty}
              </h5>
            </div>
          </div>
        ))}

      <div className="border-t w-full text-right">
        <h5 className="pt-3 text-[18px]">
          Tổng tiền: <strong>{data?.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</strong>
        </h5>
      </div>
      <br />
      <br />
      <div className="w-full 800px:flex items-center">
        <div className="w-full 800px:w-[60%]">
          <h4 className="pt-3 text-[20px] font-[600]">Địa chỉ nhận hàng:</h4>
          <h4 className="pt-3 text-[20px]">
            {data?.shippingAddress.address1 +
              " " +
              data?.shippingAddress.address2}
          </h4>
          <h4 className=" text-[20px]">{data?.shippingAddress.country}</h4>
          <h4 className=" text-[20px]">{data?.shippingAddress.city}</h4>
          <h4 className=" text-[20px]">{data?.user?.phoneNumber}</h4>
        </div>
        <div className="w-full 800px:w-[40%]">
          <h4 className="pt-3 text-[20px]">Thông tin thanh toán:</h4>
          <h4>
            Trạng thái:{" "}
            {data?.paymentInfo?.status === "Succeeded" ? "Đã thanh toán" : "Chưa thanh toán"}
          </h4>
        </div>
      </div>
      <br />
      <br />
      <h4 className="pt-3 text-[20px] font-[600]">Trạng thái đơn hàng:</h4>
      {data?.status !== "Processing refund" && data?.status !== "Refund Success" && (
        <select
          value={status}
          onChange={(e) => {setStatus(e.target.value)}}
          className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
        >
          {[
            {key: "Processing", value: "Đang xử lý"},
            {key: "Transferred to delivery partner", value: "Đã bàn giao cho đơn vị vận chuyển"},
            {key: "Shipping", value: "Đang vận chuyển"},
            {key: "Received", value: "Đã đến trạm gần địa chỉ giao hàng"},
            {key: "On the way", value: "Đang trên đường giao"},
            {key: "Delivered", value: "Đã giao thành công"},
          ]
            .slice(
              [
                "Processing",
                "Transferred to delivery partner",
                "Shipping",
                "Received",
                "On the way",
                "Delivered",
              ].indexOf(data?.status)
            )
            .map((option, index) => (
              <option value={option.key} key={index}>
                {option.value}
              </option>
            ))}
        </select>
      )}
      {
        data?.status === "Processing refund" || data?.status === "Refund Success" ? (
          <select value={status} 
       onChange={(e) => setStatus(e.target.value)}
       className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
      >
        {[
            {key: "Processing refund", value: "Đang xử lý hoàn tiền"},
            {key: "Refund Success", value: "Hoàn tất xử lý hoàn tiền"},
          ]
            .slice(
              [
                "Processing refund",
                "Refund Success",
              ].indexOf(data?.status)
            )
            .map((option, index) => (
              <option value={option.key} key={index}>
                {option.value}
              </option>
            ))}
      </select>
        ) : null
      }

      <div
        className={`${styles.button} mt-5 !bg-[#FCE1E6] !rounded-[4px] text-[#E94560] font-[600] !h-[45px] text-[18px]`}
        onClick={data?.status !== "Processing refund" ? orderUpdateHandler : refundOrderUpdateHandler}
      >
        <div>Cập nhật</div>
      </div>
    </div>
  );
};

export default OrderDetails;
