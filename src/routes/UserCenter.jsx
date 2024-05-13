import { useContext, useState } from "react";

import classes from "./UserCenter.module.less";
import { UserContext } from "../states/UserContext";
import UpdateUserBox from "../compenents/form/list/UpdateUserBox";
import NoVipCard from "../compenents/display/item/NoVipCard";
import VipLevelCard from "../compenents/display/item/VipLevelCard";
import PayModal from "../compenents/interact/PayModal";
import NoLoginUserBox from "../compenents/interact/NoLoginUserBox";
import useTabTitle from "../hooks/useDocumentTitle";

export default function UserCenterTab() {
  useTabTitle("user")

  const [modalOpen, setModalOpen] = useState(false)

  const user = useContext(UserContext)
  const userInfo = user.info
  
  const Children = userInfo ? () => {
    const { name, email, vip } = userInfo
    const data = { name, email }

    return (
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
  } : () => <NoLoginUserBox />
  return (
    <div className={classes.boxWhole}>
      <Children />
    </div>
  )
}
