export async function getSearchCategory(category: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/baby-accessories?category=${category}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data;
}
