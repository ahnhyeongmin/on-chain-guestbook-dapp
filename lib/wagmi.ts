import { createConfig, http } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

/**
 * wagmi configuration.
 * - Single chain: Sepolia testnet only
 * - injected connector (MetaMask / browser wallets)
 * - http transport (public RPC by default; set NEXT_PUBLIC_SEPOLIA_RPC_URL to override)
 */
export const config = createConfig({
  chains: [sepolia],
  connectors: [injected()],
  transports: {
    [sepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL),
  },
  ssr: true,
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
