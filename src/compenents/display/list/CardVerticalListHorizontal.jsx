import classes from "./CardVerticalListHorizontal.module.css";
import CardVertical from "../item/CardVertical";
import JumpToDetailBox from "../../interact/JumpToDetailBox";

export default function CardVerticalListHorizontal({ data }) {
  return (
    <div className={classes.listWhole}>
      {data.map((item, index) => {
        const id = item.id
        const name = item.name
        const score = item.score
        const data = { id, name, score }

        return (
          <JumpToDetailBox
            key={index}
            urlParam={item.id}>
            <CardVertical data={data} />
          </JumpToDetailBox>
        )
      })}
    </div>
  )
}
