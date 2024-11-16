import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/login',
      permanent: false, // 一時的なリダイレクト
    },
  };
};

export default function Home() {
  return null; // リダイレクトされるため、ここは表示されない
}