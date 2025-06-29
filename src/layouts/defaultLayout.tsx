function DefaultLayout({
  MainContentComponent,
}: {
  MainContentComponent: React.FC;
}) {
  return (
    <div className="bg-white min-h-screen">
      <div className={`max-w-full mx-auto`}>
        <MainContentComponent />
      </div>
    </div>
  );
}

export default DefaultLayout;
