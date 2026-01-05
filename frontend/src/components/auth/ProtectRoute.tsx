import { useAuthStore } from '@/stores/auth.store';
import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from '@/components/utils/Loading';

const ProtectRoute = () => {
  // get access token from store
  const { accessToken, refresh, fetchMe, loading, user } = useAuthStore();
  // is web starting state
  const [starting, setStarting] = useState(true);

  // initialze when refresh page or revisited page
  const init = async () => {
    // if no token
    if (!accessToken) {
      await refresh();
    }

    // if no user info
    if (accessToken && !user) {
      await fetchMe();
    }

    setStarting(false);
  };
  useEffect(() => {
    init();
  }, []);

  // when waiting for loading page
  if (starting || loading) {
    return (
      <div className="flex h-screen items-center justify-center text-4xl text-black font-semibold">
        <Loading />
      </div>
    );
  }

  if (!accessToken) {
    return (
      <Navigate to="/login" replace/>
    );
  }

  return (
    <Outlet></Outlet>
  );
}

export default ProtectRoute;