export default function HighlightDecorator({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='border border-orange-500 bg-yellow-500/20'>
      <span>{children}</span>
    </div>
  );
}
