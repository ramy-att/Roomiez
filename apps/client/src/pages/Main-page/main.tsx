import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "client/src/@/components/ui/card";

var a7a = [
  {
    description:
      "Near University road beside Starbucks, It’s walking distance from NMSU, rent $400+Utility for each person, separate nice bedrooms, with attached bathroom with each bedroom (NOT SHARED BATHROOMS), big living space and kitchen. Near University road beside Starbucks, It’s walking distance from NMSU, rent $400+Utility for each person, separate nice bedrooms, with attached bathroom with each bedroom (NOT SHARED BATHROOMS), big living space and kitchen. Near University road beside Starbucks, It’s walking distance from NMSU, rent $400+Utility for each person, separate nice bedrooms, with attached bathroom with each bedroom (NOT SHARED BATHROOMS), big living space and kitchen. Near University road beside Starbucks, It’s walking distance from NMSU, rent $400+Utility for each person, separate nice bedrooms, with attached bathroom with each bedroom (NOT SHARED BATHROOMS), big living space and kitchen. Near University road beside Starbucks, It’s walking distance from NMSU, rent $400+Utility for each person, separate nice bedrooms, with attached bathroom with each bedroom (NOT SHARED BATHROOMS), big living space and kitchen.Near University road beside Starbucks, It’s walking distance from NMSU, rent $400+Utility for each person, separate nice bedrooms, with attached bathroom with each bedroom (NOT SHARED BATHROOMS), big living space and kitchen.",
    location: "3155 avenue parkville montreal",
  },
  {
    description:
      "Near University road beside Starbucks, It’s walking distance from NMSU, rent $400+Utility for each person, separate nice bedrooms, with attached bathroom with each bedroom (NOT SHARED BATHROOMS), big living space and kitchen.",
    location: "3155 avenue parkville montreal",
  },
  {
    description:
      "Near University road beside Starbucks, It’s walking distance from NMSU, rent $400+Utility for each person, separate nice bedrooms, with attached bathroom with each bedroom (NOT SHARED BATHROOMS), big living space and kitchen.",
    location: "3155 avenue parkville montreal",
  },
];

export const MainPage = () => {
  return (
    <div className="container h-auto">
      {a7a.map((obj) => (
        <Card className="w-1/3 card text-ellipsis overflow-hidden  ">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent className="">
            <p className="line-clamp-5">{obj.description}</p>
          </CardContent>
          <CardFooter className="mt-7">
            <p>{obj.location}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
