
import Image from "next/image";
import {Button} from "../components/ui/button" 
import { Container, Title, Categories, SortPopup, TopBar, Filters } from "@/components/shared/index";
import { CheckboxFiltersGroup } from "@/components/shared/checkbox-filters-group";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="All pizzas" size="lg" className ="font-extrabold"/>
      </Container>
      <TopBar/>
      <Container className="pb-14">
        <div className = 'flex gap-[60px] mt-10'>
          {/* filration*/}
          <div className="w-[250px] ">
            <Filters/>
          </div>

          {/*List of goods */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              List of goods
            </div>
          </div>
        </div>
      </Container>
      <CheckboxFiltersGroup title={"ingredients"} items={[ {
          text: 'cheese souse',
          value:'1'
        },
        {
          text: 'cheese souse',
          value:'1'
        },
        {
          text: 'cheese souse',
          value:'1'
        },
        {
          text: 'cheese souse',
          value:'1'
        },
        {
          text: 'cheese souse',
          value:'1'
        },]} limit={6} className="mt-5"
      defaultItems={[
        {
          text: 'cheese souse',
          value:'1'
        },
        {
          text: 'cheese souse',
          value:'1'
        },
        {
          text: 'cheese souse',
          value:'1'
        },
        {
          text: 'cheese souse',
          value:'1'
        },
        {
          text: 'cheese souse',
          value:'1'
        },
      ]}></CheckboxFiltersGroup>
    </>
  );
}
