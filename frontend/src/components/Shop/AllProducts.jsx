import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import {
  AiOutlineDelete,
  AiOutlineEye,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/actions/product";
import { categoriesData } from "../../static/data";
import { Link } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { deleteProduct } from "../../redux/actions/product";
import styles from "../../styles/styles";
import Loader from "../Layout/Loader";
import { toast } from "react-toastify";
import { viVN } from "../../Assets/locale/viVN";

const AllProducts = () => {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();
  const { products, isLoading } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Tạo sản phẩm thành công!");
      navigate("/dashboard-products");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    toast.success("Xóa sản phẩm thành công!");
    window.location.reload();
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    // setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();

    images.forEach((image) => {
      newForm.set("images", image);
    });
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);
    dispatch(
      createProduct({
        name,
        description,
        category,
        tags,
        originalPrice,
        discountPrice,
        stock,
        shopId: seller._id,
        images,
      })
    );
  };

  const columns = [
    { field: "id", headerName: "Mã SP", minWidth: 150, flex: 1.2 },
    {
      field: "name",
      headerName: "Tên sản phẩm",
      minWidth: 130,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Giá",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Số lượng kho",
      type: "number",
      minWidth: 100,
      flex: 1.3,
    },

    {
      field: "sold",
      headerName: "Đã bán ra",
      type: "number",
      minWidth: 130,
      flex: 1.1,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "Chi tiết",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "Xóa sản phẩm",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  products &&
    products.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: item.discountPrice.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
        Stock: item.stock,
        sold: item?.sold_out,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}
              onClick={() => setOpen(true)}
            >
              <span className="text-white">Tạo sản phẩm</span>
            </div>
          </div>

          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
            localeText={viVN}
          />

          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
              <div className="w-[90%] 800px:w-[40%] h-[90vh] 800px:h-[90vh] overflow-auto bg-white rounded-md shadow p-4">
                <div className="w-full flex justify-end">
                  <RxCross1
                    size={30}
                    className="cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <h5 className="text-[30px] text-center">Tạo sản phẩm</h5>
                {/* create product form */}
                <form onSubmit={handleSubmit}>
                  <br />
                  <div>
                    <label className="pb-2">
                      Tên sản phẩm <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nhập tên sản phẩm..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Mô tả sản phẩm <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      cols="30"
                      required
                      rows="8"
                      type="text"
                      name="description"
                      value={description}
                      className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Nhập mô tả sản phẩm..."
                    ></textarea>
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Danh mục sản phẩm <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full mt-2 border h-[35px] rounded-[5px]"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="Choose a category">
                        --Lựa chọn danh mục--
                      </option>
                      {categoriesData &&
                        categoriesData.map((i) => (
                          <option value={i.title} key={i.title}>
                            {i.title}
                          </option>
                        ))}
                    </select>
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Tags</label>
                    <input
                      type="text"
                      name="tags"
                      value={tags}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="Nhập tags của sản phẩm..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Giá ban đầu</label>
                    <input
                      type="number"
                      name="price"
                      value={originalPrice}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      placeholder="Nhập giá sản phẩm..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Giá (giảm giá) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={discountPrice}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setDiscountPrice(e.target.value)}
                      placeholder="Nhập giá sản phẩm sau giảm giá..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Số lượng nhập kho <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={stock}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setStock(e.target.value)}
                      placeholder="Nhập số lượng trong kho..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Tải hình ảnh lên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      name=""
                      id="upload"
                      className="hidden"
                      multiple
                      onChange={handleImageChange}
                    />
                    <div className="w-full flex items-center flex-wrap">
                      <label htmlFor="upload">
                        <AiOutlinePlusCircle
                          size={30}
                          className="mt-3"
                          color="#555"
                        />
                      </label>
                      {images &&
                        images.map((i) => (
                          <img
                            src={i}
                            key={i}
                            alt=""
                            className="h-[120px] w-[120px] object-cover m-2"
                          />
                        ))}
                    </div>
                    <br />
                    <div>
                      <input
                        type="submit"
                        value="Tạo sản phẩm"
                        className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#09489b] text-white"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllProducts;
