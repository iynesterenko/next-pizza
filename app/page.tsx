
import Image from "next/image";
import {Button} from "../components/ui/button" 
import { Container, Title, Categories, SortPopup, TopBar, Filters } from "@/components/shared/index";
import { ProductsGroupList } from "@/components/shared/product-group-list";
import { CheckboxFiltersGroup } from "@/components/shared/checkbox-filters-group";
import { ProductCard } from "@/components/shared/product-card";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="All pizzas" size="lg" className ="font-extrabold"/>
        
      </Container>
      <TopBar />
      <div style={{height: '3000'}}> </div>
      <Container className="pb-14">
        <div className = 'flex gap-[80px] mt-10'>
          {/* filration*/}
          <div className="w-[250px] ">
            <Filters/>
          </div>

          {/*List of goods */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList title="Pizzas" items={[ 
                {id: 1, name: "Cheesy maniac", price: 350, imageUrl: "https://media.dodostatic.com/image/r:584x584/0194733055c671acba94324ee3962682.avif"},
                { id: 2, name: "Cheesy maniac", price: 350, imageUrl: "https://media.dodostatic.com/image/r:584x584/0194733055c671acba94324ee3962682.avif"},
                {id: 3, name: "Cheesy maniac", price: 350, imageUrl: "https://media.dodostatic.com/image/r:584x584/0194733055c671acba94324ee3962682.avif"},
                {id: 4, name: "Cheesy maniac", price: 350, imageUrl: "https://media.dodostatic.com/image/r:584x584/0194733055c671acba94324ee3962682.avif"},
                {id: 5, name: "Cheesy maniac", price: 350, imageUrl: "https://media.dodostatic.com/image/r:584x584/0194733055c671acba94324ee3962682.avif"},
                {id: 6, name: "Cheesy maniac", price: 350, imageUrl: "https://media.dodostatic.com/image/r:584x584/0194733055c671acba94324ee3962682.avif"},
                {id: 7, name: "Cheesy maniac", price: 350, imageUrl: "https://media.dodostatic.com/image/r:584x584/0194733055c671acba94324ee3962682.avif"},
                {id: 8, name: "Cheesy maniac", price: 350, imageUrl: "https://media.dodostatic.com/image/r:584x584/0194733055c671acba94324ee3962682.avif"},
                {id: 9, name: "Cheesy maniac", price: 350, imageUrl: "https://media.dodostatic.com/image/r:584x584/0194733055c671acba94324ee3962682.avif"},
                {id: 10, name: "Cheesy maniac", price: 350, imageUrl: "https://media.dodostatic.com/image/r:584x584/0194733055c671acba94324ee3962682.avif"},
                {id: 11, name: "Cheesy maniac", price: 350, imageUrl: "https://media.dodostatic.com/image/r:584x584/0194733055c671acba94324ee3962682.avif"},
                {id: 12, name: "Cheesy maniac", price: 350, imageUrl: "https://media.dodostatic.com/image/r:584x584/0194733055c671acba94324ee3962682.avif"},
                {id: 13, name: "Cheesy maniac", price: 350, imageUrl: "https://media.dodostatic.com/image/r:584x584/0194733055c671acba94324ee3962682.avif"},
                {id: 14, name: "Cheesy maniac", price: 350, imageUrl: "https://media.dodostatic.com/image/r:584x584/0194733055c671acba94324ee3962682.avif"},
              ]}
              categoryId={1}/>
              <ProductsGroupList title="Breakfast" items={[     
                {id: 1, name: "Cheesy maniac", price: 350, imageUrl: "https://media.dodostatic.com/image/r:584x584/0194733055c671acba94324ee3962682.avif"},
                { id: 2, name: "Cheesy maniac", price: 350, imageUrl: "https://media.dodostatic.com/image/r:584x584/0194733055c671acba94324ee3962682.avif"},
                {id: 3, name: "Cheesy maniac", price: 350, imageUrl: "https://media.dodostatic.com/image/r:584x584/0194733055c671acba94324ee3962682.avif"},
                {id: 4, name: "Cheesy maniac", price: 350, imageUrl: "https://media.dodostatic.com/image/r:584x584/0194733055c671acba94324ee3962682.avif"},
                {id: 5, name: "Cheesy maniac", price: 350, imageUrl: "https://media.dodostatic.com/image/r:584x584/0194733055c671acba94324ee3962682.avif"},
                {id: 6, name: "Cheesy maniac", price: 350, imageUrl: "https://media.dodostatic.com/image/r:584x584/0194733055c671acba94324ee3962682.avif"},
                {id: 7, name: "Cheesy maniac", price: 350, imageUrl: "https://media.dodostatic.com/image/r:584x584/0194733055c671acba94324ee3962682.avif"},
                {id: 8, name: "Cheesy maniac", price: 350, imageUrl: "https://media.dodostatic.com/image/r:584x584/0194733055c671acba94324ee3962682.avif"},
                {id: 9, name: "Cheesy maniac", price: 350, imageUrl: "https://media.dodostatic.com/image/r:584x584/0194733055c671acba94324ee3962682.avif"},
                {id: 10, name: "Cheesy maniac", price: 350, imageUrl: "https://media.dodostatic.com/image/r:584x584/0194733055c671acba94324ee3962682.avif"},
                {id: 11, name: "Cheesy maniac", price: 350, imageUrl: "https://media.dodostatic.com/image/r:584x584/0194733055c671acba94324ee3962682.avif"},
                {id: 12, name: "Cheesy maniac", price: 350, imageUrl: "https://media.dodostatic.com/image/r:584x584/0194733055c671acba94324ee3962682.avif"},
                {id: 13, name: "Cheesy maniac", price: 350, imageUrl: "https://media.dodostatic.com/image/r:584x584/0194733055c671acba94324ee3962682.avif"},
                {id: 14, name: "Cheesy maniac", price: 350, imageUrl: "https://media.dodostatic.com/image/r:584x584/0194733055c671acba94324ee3962682.avif"},
              ]}
              categoryId={2}/>
              
            </div>
          </div>
        </div>
      </Container>
      
    </>
  );
}
