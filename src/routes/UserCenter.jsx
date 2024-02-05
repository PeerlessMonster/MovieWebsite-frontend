import { useContext, useState } from "react";

import classes from "./UserCenter.module.less";
import { UserContext } from "../states/UserContext";
import UpdateUserBox from "../compenents/form/list/UpdateUserBox";
import NoVipCard from "../compenents/display/item/NoVipCard";
import VipLevelCard from "../compenents/display/item/VipLevelCard";
import PayModal from "../compenents/interact/PayModal";
import NoLoginUserBox from "../compenents/interact/NoLoginUserBox";
import useTabTitle from "../utils/useDocumentTitle";

export default function UserCenterTab() {
  useTabTitle("user")
  let Child

  const [modalOpen, setModalOpen] = useState(false)

  const user = useContext(UserContext)
  const userInfo = user.info
  if (userInfo) {
    const name = userInfo.name
    const email = userInfo.email
    const data = { name, email }
    const vip = userInfo.vip

    Child = () => (
      <div className="content">
        <div className={classes.ad}>
          {vip === 0 ? (
            <NoVipCard openModal={() => setModalOpen(true)} />
          ) : (
            <VipLevelCard value={vip} />
          )}
        </div>
        <PayModal
          modalOpen={modalOpen}
          closeModal={() => setModalOpen(false)}
        />
        <div className={classes.formEndofAd}>
          <h1>修改信息</h1>
          <UpdateUserBox data={data} />
        </div>
      </div>
    )
  } else {
    Child = () => <NoLoginUserBox />
  }

  return (
    <div className={classes.boxWhole}>
      <Child />
    </div>
  )
}
