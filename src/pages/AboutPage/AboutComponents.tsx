import {Accordion, AccordionDetails, AccordionSummary,} from "@mui/material";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import React from "react";

interface IAccordionGroup {
    data:AccordionGroupType

}
export type AccordionGroupType ={
    group: {
        groupTitle: string
        sub: {
            title: string, value: JSX.Element
        }[]
    }[]

}
export type BulletListType = JSX.Element[]
interface IBulletList {
    data:BulletListType

}
export const BulletList:React.FC<IBulletList> = ({data}) => {

  return(
      <div className="experience-list">
          {data.map((el=>  <p><span className="bullet-list">&#x2022;</span>{el}</p>))}
      </div>
  )
}
export const AccordionGroup:React.FC<IAccordionGroup> = ({data}) => {
        return(
            <div className="accordion-group">
                {data.group.map((el)=>{
                    return(
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ArrowForwardIosSharpIcon/>}>
                                <h2>{el.groupTitle}</h2>
                            </AccordionSummary>
                            <AccordionDetails>
                                {el.sub.map((el)=> {
                                    return (
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ArrowForwardIosSharpIcon/>}>
                                                <h3>{el.title}</h3>
                                            </AccordionSummary>
                                            <AccordionDetails className="white">
                                                <h4>
                                                    {el.value}
                                                </h4>
                                            </AccordionDetails>
                                        </Accordion>
                                    )
                                })}
                            </AccordionDetails>
                        </Accordion>
                    )
                })}

            </div>
        )

}