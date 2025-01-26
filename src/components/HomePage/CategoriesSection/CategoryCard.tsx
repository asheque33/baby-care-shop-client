import Link from "next/link";
interface ICategoryProps {
  title: string;
  href: string;
  image: string;
  bgSize: string;
}
const CategoryCard = ({ title, href, image, bgSize }: ICategoryProps) => {
  return (
    <>
      <Link
        href={href}
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: "center 15%",
          backgroundColor: "#f5efe6",
          backgroundRepeat: "no-repeat",
          backgroundSize: bgSize,
        }}
        className="flex justify-center items-center shadow rounded-xl  hover:scale-105 hover:transition-all"
      >
        <span className="text-slate-600  font-medium">{title}</span>
      </Link>
    </>
  );
};

export default CategoryCard;
