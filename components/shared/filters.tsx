import React from "react";
import { FilterCheckbox, RangeSlider, Title } from "./index";
import { Input } from "../ui";

type Props = {
  className?: string;
};

export const Filters: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <Title text="Filtration" size="sm" className="mb-5 font-bold"></Title>
      {/*upper checkbox*/}


      <div className="flex flex-col gap-4">
        <FilterCheckbox text="You can choose" value="1" />
        <FilterCheckbox text="New" value="1" />
      </div>
        {/*Price filter*/}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">price from to:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            defaultValue={0}
          />
          <Input
            type="number"
            min={100}
            max={1000}
            placeholder="1000"
            defaultValue={300}
          />
          
        </div>
        <RangeSlider min={0} max={1000} step={10} value={[0,1000]}></RangeSlider>
      </div>
    </div>
  );
};
