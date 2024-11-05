import HorizontalArticle from '../Article/Horizontal';
export default function RelatedArticle({ articles }: { articles: any[] }) {
  return (
    <section className='md:border md:px-6 md:py-2'>
      <h2 className='hidden md:block text-xl font-bold text-[--main-color] uppercase my-4'>
        Tin liên quan
      </h2>

      <ul className='flex flex-col gap-4'>
        {articles.map((a, index) => (
          <li key={index}>
            <HorizontalArticle
              article={a}
              ratio='5/7'
              colSpan={12}
              className='grid'
              detailed
              important
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
