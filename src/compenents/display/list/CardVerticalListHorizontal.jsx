import classes from "./CardVerticalListHorizontal.module.css";
import CardVertical from "../item/CardVertical";
import JumpToDetailBox from "../../interact/JumpToDetailBox";

export default function CardVerticalListHorizontal({ data }) {
  return (
    <div className={classes.listWhole}>
      {data.map((item, index) => {
        const { id } = item
        return (
          <JumpToDetailBox
            key={index}
            urlParam={id}>
            <CardVertical data={item} />
          </JumpToDetailBox>
        )
      })}
    </div>
  )
}
