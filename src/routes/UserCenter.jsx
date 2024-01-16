import { useContext, useState } from "react"

import classes from "./UserCenter.module.less";
import { userContext } from "../states/userContext";
import { pathToTitle } from "./route_config";
import UpdateUserBox from "../compenents/form/list/UpdateUserBox";
import NoVipCard from "../compenents/display/item/NoVipCard";
import VipLevelCard from "../compenents/display/item/VipLevelCard";
import PayModal from "../compenents/control/PayModal";

export async function loader() {
  document.title = pathToTitle.get("user")
  return {}
}

export default function UserCenterTab() {
  const [modalOpen, setModalOpen] = useState(false)

  const user = useContext(userContext)
  const userInfo = user.info

  const name = userInfo.name
  const email = userInfo.email
  const data = { name, email }
  const vip = userInfo.vip

  return (
    <div className={classes.contentWhole}>
      <div className={classes.ad}>
        {vip === 0 ? (
          <NoVipCard openModal={() => setModalOpen(true)} />
        ) : (
          <VipLevelCard value={vip} />
        )}
      </div>
      <PayModal modalOpen={modalOpen} closeModal={() => setModalOpen(false)} />
      <div className={classes.formEndofAd}>
        <h1>修改信息</h1>
        <UpdateUserBox data={data} />
      </div>
    </div>
  )
}
