interface WithLoaderProps {
  loading: boolean;
  error: string | null;
}
const withLoader = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P & WithLoaderProps> => {
  return ({ loading, error, ...props }: WithLoaderProps) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return <WrappedComponent {...(props as P)} />;
  };
};

export default withLoader;
