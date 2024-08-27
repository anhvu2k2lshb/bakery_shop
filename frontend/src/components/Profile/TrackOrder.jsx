import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllOrdersOfUser } from "../../redux/actions/order";

const TrackOrder = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      {" "}
      <>
        {data && data?.status === "Processing" ? (
          <h1 className="text-[20px]">Đơn hàng đang được chủ cửa hàng xử lý.</h1>
        ) : data?.status === "Transferred to delivery partner" ? (
          <h1 className="text-[20px]">
            Đơn hàng của bạn đã được bàn giao cho đơn vị vận chuyển.
          </h1>
        ) : data?.status === "Shipping" ? (
          <h1 className="text-[20px]">
            Đơn hàng của bạn đang trên đường vận chuyển.
          </h1>
        ) : data?.status === "Received" ? (
          <h1 className="text-[20px]">
            Đơn hàng đã tới trạm gần địa chỉ của bạn.
          </h1>
        ) : data?.status === "On the way" ? (
          <h1 className="text-[20px]">
            Đơn hàng sẽ sớm được giao. Vui lòng chú ý điện thoại!
          </h1>
        ) : data?.status === "Delivered" ? (
          <h1 className="text-[20px]">Đơn hàng được giao thành công!</h1>
        ) : data?.status === "Processing refund" ? (
          <h1 className="text-[20px]">Yêu cầu hoàn trả hàng đang được xử lý!</h1>
        ) : data?.status === "Refund Success" ? (
          <h1 className="text-[20px]">Yêu cầu hoàn trả hàng thành công!</h1>
        ) : null}
      </>
    </div>
  );
};

export default TrackOrder;
