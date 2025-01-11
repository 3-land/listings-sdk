import * as TraitPassType from "./TraitPassType"
import * as TraitType from "./TraitType"
import * as TraitInit from "./TraitInit"
import * as DepositTrackType from "./DepositTrackType"
import * as DepositState from "./DepositState"
import * as DepositFormat from "./DepositFormat"
import * as DepositType from "./DepositType"
import * as BuyHistoryClass from "./BuyHistoryClass"
import * as FeeType from "./FeeType"
import * as PackRule from "./PackRule"
import * as StoreRule from "./StoreRule"
import * as BurnTypeBurn from "./BurnTypeBurn"
import * as EditionStoreType from "./EditionStoreType"
import * as FilterType from "./FilterType"
import * as PopularityState from "./PopularityState"
import * as TrackRegistry from "./TrackRegistry"
import * as PackType from "./PackType"
import * as SaleType from "./SaleType"
import * as RegistryType from "./RegistryType"
import * as CurrencyType from "./CurrencyType"
import * as CardState from "./CardState"
import * as ItemState from "./ItemState"
import * as PackState from "./PackState"
import * as PackOpenHolderState from "./PackOpenHolderState"
import * as PriceRule from "./PriceRule"
import * as TimeRangeType from "./TimeRangeType"
import * as ActionAfter from "./ActionAfter"
import * as Rule from "./Rule"
import * as AuthorityGateTypes from "./AuthorityGateTypes"
import * as PoolConfig from "./PoolConfig"
import * as PoolType from "./PoolType"
import * as PoolState from "./PoolState"
import * as PoolAccess from "./PoolAccess"
import * as ExtraParameter from "./ExtraParameter"
import * as AccountClass from "./AccountClass"
import * as GlobalState from "./GlobalState"
import * as BurnType from "./BurnType"
import * as PaymentClass from "./PaymentClass"
import * as ItemClass from "./ItemClass"
import * as CardClass from "./CardClass"
import * as TokenProgramVersion from "./TokenProgramVersion"
import * as TokenStandard from "./TokenStandard"
import * as UseMethod from "./UseMethod"

export { TraitPass } from "./TraitPass"
export type { TraitPassFields, TraitPassJSON } from "./TraitPass"
export { CurrencyArtistProof } from "./CurrencyArtistProof"
export type {
  CurrencyArtistProofFields,
  CurrencyArtistProofJSON,
} from "./CurrencyArtistProof"
export { TraitPassType }

export type TraitPassTypeKind =
  | TraitPassType.SemiFungible
  | TraitPassType.Date
  | TraitPassType.NonFungible
export type TraitPassTypeJSON =
  | TraitPassType.SemiFungibleJSON
  | TraitPassType.DateJSON
  | TraitPassType.NonFungibleJSON

export { TraitType }

export type TraitTypeKind =
  | TraitType.SemiFungible
  | TraitType.Date
  | TraitType.NonFungible
  | TraitType.Data
export type TraitTypeJSON =
  | TraitType.SemiFungibleJSON
  | TraitType.DateJSON
  | TraitType.NonFungibleJSON
  | TraitType.DataJSON

export { FeedingTraits } from "./FeedingTraits"
export type { FeedingTraitsFields, FeedingTraitsJSON } from "./FeedingTraits"
export { TraitInit }

export type TraitInitKind =
  | TraitInit.SemiFungible
  | TraitInit.Date
  | TraitInit.NonFungible
  | TraitInit.Data
export type TraitInitJSON =
  | TraitInit.SemiFungibleJSON
  | TraitInit.DateJSON
  | TraitInit.NonFungibleJSON
  | TraitInit.DataJSON

export { DateTraitInitMap } from "./DateTraitInitMap"
export type {
  DateTraitInitMapFields,
  DateTraitInitMapJSON,
} from "./DateTraitInitMap"
export { DateTraitInit } from "./DateTraitInit"
export type { DateTraitInitFields, DateTraitInitJSON } from "./DateTraitInit"
export { DataTraitInitMap } from "./DataTraitInitMap"
export type {
  DataTraitInitMapFields,
  DataTraitInitMapJSON,
} from "./DataTraitInitMap"
export { DataTraitInit } from "./DataTraitInit"
export type { DataTraitInitFields, DataTraitInitJSON } from "./DataTraitInit"
export { NonFungibleTraitInitMap } from "./NonFungibleTraitInitMap"
export type {
  NonFungibleTraitInitMapFields,
  NonFungibleTraitInitMapJSON,
} from "./NonFungibleTraitInitMap"
export { SemiFungibleTraitInitMap } from "./SemiFungibleTraitInitMap"
export type {
  SemiFungibleTraitInitMapFields,
  SemiFungibleTraitInitMapJSON,
} from "./SemiFungibleTraitInitMap"
export { NonFungibleTraitInit } from "./NonFungibleTraitInit"
export type {
  NonFungibleTraitInitFields,
  NonFungibleTraitInitJSON,
} from "./NonFungibleTraitInit"
export { SemiFungibleTraitInit } from "./SemiFungibleTraitInit"
export type {
  SemiFungibleTraitInitFields,
  SemiFungibleTraitInitJSON,
} from "./SemiFungibleTraitInit"
export { TraitValue } from "./TraitValue"
export type { TraitValueFields, TraitValueJSON } from "./TraitValue"
export { Currency } from "./Currency"
export type { CurrencyFields, CurrencyJSON } from "./Currency"
export { StoreConfig } from "./StoreConfig"
export type { StoreConfigFields, StoreConfigJSON } from "./StoreConfig"
export { GlobalFee } from "./GlobalFee"
export type { GlobalFeeFields, GlobalFeeJSON } from "./GlobalFee"
export { ListingPerWalletArgs } from "./ListingPerWalletArgs"
export type {
  ListingPerWalletArgsFields,
  ListingPerWalletArgsJSON,
} from "./ListingPerWalletArgs"
export { AllowedCurrencyArgs } from "./AllowedCurrencyArgs"
export type {
  AllowedCurrencyArgsFields,
  AllowedCurrencyArgsJSON,
} from "./AllowedCurrencyArgs"
export { FakeBurnCount } from "./FakeBurnCount"
export type { FakeBurnCountFields, FakeBurnCountJSON } from "./FakeBurnCount"
export { BurnCount } from "./BurnCount"
export type { BurnCountFields, BurnCountJSON } from "./BurnCount"
export { Seed } from "./Seed"
export type { SeedFields, SeedJSON } from "./Seed"
export { AccountHasher } from "./AccountHasher"
export type { AccountHasherFields, AccountHasherJSON } from "./AccountHasher"
export { RecoverDeposit } from "./RecoverDeposit"
export type { RecoverDepositFields, RecoverDepositJSON } from "./RecoverDeposit"
export { CnftData } from "./CnftData"
export type { CnftDataFields, CnftDataJSON } from "./CnftData"
export { Deposit } from "./Deposit"
export type { DepositFields, DepositJSON } from "./Deposit"
export { DepositTrackType }

export type DepositTrackTypeKind =
  | DepositTrackType.Creator
  | DepositTrackType.PdaCreator
export type DepositTrackTypeJSON =
  | DepositTrackType.CreatorJSON
  | DepositTrackType.PdaCreatorJSON

export { DepositTrack } from "./DepositTrack"
export type { DepositTrackFields, DepositTrackJSON } from "./DepositTrack"
export { FakeDeposit } from "./FakeDeposit"
export type { FakeDepositFields, FakeDepositJSON } from "./FakeDeposit"
export { DepositState }

export type DepositStateKind = DepositState.Available | DepositState.Burning
export type DepositStateJSON =
  | DepositState.AvailableJSON
  | DepositState.BurningJSON

export { DepositFormat }

export type DepositFormatKind = DepositFormat.Cnft | DepositFormat.Nft
export type DepositFormatJSON = DepositFormat.CnftJSON | DepositFormat.NftJSON

export { DepositType }

export type DepositTypeKind = DepositType.Creator | DepositType.PdaCreator
export type DepositTypeJSON =
  | DepositType.CreatorJSON
  | DepositType.PdaCreatorJSON

export { SelectedZeroCard } from "./SelectedZeroCard"
export type {
  SelectedZeroCardFields,
  SelectedZeroCardJSON,
} from "./SelectedZeroCard"
export { SelectedCard } from "./SelectedCard"
export type { SelectedCardFields, SelectedCardJSON } from "./SelectedCard"
export { BurnTrack } from "./BurnTrack"
export type { BurnTrackFields, BurnTrackJSON } from "./BurnTrack"
export { MemeVaultProof } from "./MemeVaultProof"
export type { MemeVaultProofFields, MemeVaultProofJSON } from "./MemeVaultProof"
export { Item } from "./Item"
export type { ItemFields, ItemJSON } from "./Item"
export { ItemTrack } from "./ItemTrack"
export type { ItemTrackFields, ItemTrackJSON } from "./ItemTrack"
export { IndexDateNoHour } from "./IndexDateNoHour"
export type {
  IndexDateNoHourFields,
  IndexDateNoHourJSON,
} from "./IndexDateNoHour"
export { CardTrack } from "./CardTrack"
export type { CardTrackFields, CardTrackJSON } from "./CardTrack"
export { IndexDate } from "./IndexDate"
export type { IndexDateFields, IndexDateJSON } from "./IndexDate"
export { IndexDates } from "./IndexDates"
export type { IndexDatesFields, IndexDatesJSON } from "./IndexDates"
export { SaleTrack } from "./SaleTrack"
export type { SaleTrackFields, SaleTrackJSON } from "./SaleTrack"
export { CollectTrack } from "./CollectTrack"
export type { CollectTrackFields, CollectTrackJSON } from "./CollectTrack"
export { Filter } from "./Filter"
export type { FilterFields, FilterJSON } from "./Filter"
export { Category } from "./Category"
export type { CategoryFields, CategoryJSON } from "./Category"
export { SuperCategory } from "./SuperCategory"
export type { SuperCategoryFields, SuperCategoryJSON } from "./SuperCategory"
export { Earnings } from "./Earnings"
export type { EarningsFields, EarningsJSON } from "./Earnings"
export { Popularity } from "./Popularity"
export type { PopularityFields, PopularityJSON } from "./Popularity"
export { FakeTraitValue } from "./FakeTraitValue"
export type { FakeTraitValueFields, FakeTraitValueJSON } from "./FakeTraitValue"
export { FakeTraitPair } from "./FakeTraitPair"
export type { FakeTraitPairFields, FakeTraitPairJSON } from "./FakeTraitPair"
export { FakeVolumeTrack } from "./FakeVolumeTrack"
export type {
  FakeVolumeTrackFields,
  FakeVolumeTrackJSON,
} from "./FakeVolumeTrack"
export { PackConfig } from "./PackConfig"
export type { PackConfigFields, PackConfigJSON } from "./PackConfig"
export { VolumeTrack } from "./VolumeTrack"
export type { VolumeTrackFields, VolumeTrackJSON } from "./VolumeTrack"
export { SaleConfig } from "./SaleConfig"
export type { SaleConfigFields, SaleConfigJSON } from "./SaleConfig"
export { ZeroConfig } from "./ZeroConfig"
export type { ZeroConfigFields, ZeroConfigJSON } from "./ZeroConfig"
export { Price } from "./Price"
export type { PriceFields, PriceJSON } from "./Price"
export { CoolTimePerAmountArgs } from "./CoolTimePerAmountArgs"
export type {
  CoolTimePerAmountArgsFields,
  CoolTimePerAmountArgsJSON,
} from "./CoolTimePerAmountArgs"
export { TotalPerTimeArgs } from "./TotalPerTimeArgs"
export type {
  TotalPerTimeArgsFields,
  TotalPerTimeArgsJSON,
} from "./TotalPerTimeArgs"
export { OnlyBetweenTimesArgs } from "./OnlyBetweenTimesArgs"
export type {
  OnlyBetweenTimesArgsFields,
  OnlyBetweenTimesArgsJSON,
} from "./OnlyBetweenTimesArgs"
export { OnlyTheseDOWArgs } from "./OnlyTheseDOWArgs"
export type {
  OnlyTheseDOWArgsFields,
  OnlyTheseDOWArgsJSON,
} from "./OnlyTheseDOWArgs"
export { CreatorGateArgs } from "./CreatorGateArgs"
export type {
  CreatorGateArgsFields,
  CreatorGateArgsJSON,
} from "./CreatorGateArgs"
export { TotalPerTimeWalletArgs } from "./TotalPerTimeWalletArgs"
export type {
  TotalPerTimeWalletArgsFields,
  TotalPerTimeWalletArgsJSON,
} from "./TotalPerTimeWalletArgs"
export { TimedPerWalletArgs } from "./TimedPerWalletArgs"
export type {
  TimedPerWalletArgsFields,
  TimedPerWalletArgsJSON,
} from "./TimedPerWalletArgs"
export { WrappedDestiny } from "./WrappedDestiny"
export type { WrappedDestinyFields, WrappedDestinyJSON } from "./WrappedDestiny"
export { WrappedSource } from "./WrappedSource"
export type { WrappedSourceFields, WrappedSourceJSON } from "./WrappedSource"
export { Uses } from "./Uses"
export type { UsesFields, UsesJSON } from "./Uses"
export { Collection } from "./Collection"
export type { CollectionFields, CollectionJSON } from "./Collection"
export { Creator } from "./Creator"
export type { CreatorFields, CreatorJSON } from "./Creator"
export { ShortCreator } from "./ShortCreator"
export type { ShortCreatorFields, ShortCreatorJSON } from "./ShortCreator"
export { TightCardMetadata } from "./TightCardMetadata"
export type {
  TightCardMetadataFields,
  TightCardMetadataJSON,
} from "./TightCardMetadata"
export { ShortMetadata } from "./ShortMetadata"
export type { ShortMetadataFields, ShortMetadataJSON } from "./ShortMetadata"
export { MetadataArgs } from "./MetadataArgs"
export type { MetadataArgsFields, MetadataArgsJSON } from "./MetadataArgs"
export { ShortMetadataArgs } from "./ShortMetadataArgs"
export type {
  ShortMetadataArgsFields,
  ShortMetadataArgsJSON,
} from "./ShortMetadataArgs"
export { UpdateMetadata } from "./UpdateMetadata"
export type { UpdateMetadataFields, UpdateMetadataJSON } from "./UpdateMetadata"
export { ChangingMetadata } from "./ChangingMetadata"
export type {
  ChangingMetadataFields,
  ChangingMetadataJSON,
} from "./ChangingMetadata"
export { BuyHistoryClass }

export type BuyHistoryClassKind =
  | BuyHistoryClass.SingleBuyV1
  | BuyHistoryClass.PackBuyV1
export type BuyHistoryClassJSON =
  | BuyHistoryClass.SingleBuyV1JSON
  | BuyHistoryClass.PackBuyV1JSON

export { FeeType }

export type FeeTypeKind =
  | FeeType.AllMints
  | FeeType.PricedMintsOnly
  | FeeType.SkipBurnMints
export type FeeTypeJSON =
  | FeeType.AllMintsJSON
  | FeeType.PricedMintsOnlyJSON
  | FeeType.SkipBurnMintsJSON

export { PackRule }

export type PackRuleKind = PackRule.CoolDownToOpen
export type PackRuleJSON = PackRule.CoolDownToOpenJSON

export { StoreRule }

export type StoreRuleKind =
  | StoreRule.ListingPerWallet
  | StoreRule.AllowedCurrency
export type StoreRuleJSON =
  | StoreRule.ListingPerWalletJSON
  | StoreRule.AllowedCurrencyJSON

export { BurnTypeBurn }

export type BurnTypeBurnKind = BurnTypeBurn.CollectionBurn
export type BurnTypeBurnJSON = BurnTypeBurn.CollectionBurnJSON

export { EditionStoreType }

export type EditionStoreTypeKind =
  | EditionStoreType.None
  | EditionStoreType.Name
  | EditionStoreType.Url
export type EditionStoreTypeJSON =
  | EditionStoreType.NoneJSON
  | EditionStoreType.NameJSON
  | EditionStoreType.UrlJSON

export { FilterType }

export type FilterTypeKind = FilterType.None
export type FilterTypeJSON = FilterType.NoneJSON

export { PopularityState }

export type PopularityStateKind =
  | PopularityState.New
  | PopularityState.None
  | PopularityState.First
  | PopularityState.Ten
  | PopularityState.TwentyFive
  | PopularityState.Hundred
  | PopularityState.Thousand
  | PopularityState.TenThousand
  | PopularityState.HundredThousand
  | PopularityState.Million
  | PopularityState.TenMillion
  | PopularityState.HundredMillion
  | PopularityState.Billion
  | PopularityState.TenBillion
  | PopularityState.HundrerBillion
  | PopularityState.Trillion
  | PopularityState.TenTrillion
  | PopularityState.HundredTrillion
  | PopularityState.Highest
  | PopularityState.Banned
export type PopularityStateJSON =
  | PopularityState.NewJSON
  | PopularityState.NoneJSON
  | PopularityState.FirstJSON
  | PopularityState.TenJSON
  | PopularityState.TwentyFiveJSON
  | PopularityState.HundredJSON
  | PopularityState.ThousandJSON
  | PopularityState.TenThousandJSON
  | PopularityState.HundredThousandJSON
  | PopularityState.MillionJSON
  | PopularityState.TenMillionJSON
  | PopularityState.HundredMillionJSON
  | PopularityState.BillionJSON
  | PopularityState.TenBillionJSON
  | PopularityState.HundrerBillionJSON
  | PopularityState.TrillionJSON
  | PopularityState.TenTrillionJSON
  | PopularityState.HundredTrillionJSON
  | PopularityState.HighestJSON
  | PopularityState.BannedJSON

export { TrackRegistry }

export type TrackRegistryKind = TrackRegistry.NoTrack | TrackRegistry.Tracked
export type TrackRegistryJSON =
  | TrackRegistry.NoTrackJSON
  | TrackRegistry.TrackedJSON

export { PackType }

export type PackTypeKind =
  | PackType.RandomDirect
  | PackType.RandomPack
  | PackType.Bundle
export type PackTypeJSON =
  | PackType.RandomDirectJSON
  | PackType.RandomPackJSON
  | PackType.BundleJSON

export { SaleType }

export type SaleTypeKind = SaleType.Normal | SaleType.NoMarketFee
export type SaleTypeJSON = SaleType.NormalJSON | SaleType.NoMarketFeeJSON

export { RegistryType }

export type RegistryTypeKind = RegistryType.None | RegistryType.WrappedPool
export type RegistryTypeJSON =
  | RegistryType.NoneJSON
  | RegistryType.WrappedPoolJSON

export { CurrencyType }

export type CurrencyTypeKind =
  | CurrencyType.Native
  | CurrencyType.Spl
  | CurrencyType.Collection
  | CurrencyType.Creator
  | CurrencyType.None
export type CurrencyTypeJSON =
  | CurrencyType.NativeJSON
  | CurrencyType.SplJSON
  | CurrencyType.CollectionJSON
  | CurrencyType.CreatorJSON
  | CurrencyType.NoneJSON

export { CardState }

export type CardStateKind =
  | CardState.Active
  | CardState.Hidden
  | CardState.Inactive
  | CardState.Retired
  | CardState.SoldOut
  | CardState.None
  | CardState.NotReady
export type CardStateJSON =
  | CardState.ActiveJSON
  | CardState.HiddenJSON
  | CardState.InactiveJSON
  | CardState.RetiredJSON
  | CardState.SoldOutJSON
  | CardState.NoneJSON
  | CardState.NotReadyJSON

export { ItemState }

export type ItemStateKind =
  | ItemState.Active
  | ItemState.Hidden
  | ItemState.Inactive
  | ItemState.Retired
  | ItemState.SoldOut
  | ItemState.None
  | ItemState.NotReady
  | ItemState.NotReadyStarted
  | ItemState.Flagged
export type ItemStateJSON =
  | ItemState.ActiveJSON
  | ItemState.HiddenJSON
  | ItemState.InactiveJSON
  | ItemState.RetiredJSON
  | ItemState.SoldOutJSON
  | ItemState.NoneJSON
  | ItemState.NotReadyJSON
  | ItemState.NotReadyStartedJSON
  | ItemState.FlaggedJSON

export { PackState }

export type PackStateKind =
  | PackState.Closed
  | PackState.Opened
  | PackState.Unassigned
export type PackStateJSON =
  | PackState.ClosedJSON
  | PackState.OpenedJSON
  | PackState.UnassignedJSON

export { PackOpenHolderState }

export type PackOpenHolderStateKind =
  | PackOpenHolderState.Unclaimed
  | PackOpenHolderState.Claiming
  | PackOpenHolderState.Claimed
export type PackOpenHolderStateJSON =
  | PackOpenHolderState.UnclaimedJSON
  | PackOpenHolderState.ClaimingJSON
  | PackOpenHolderState.ClaimedJSON

export { PriceRule }

export type PriceRuleKind =
  | PriceRule.None
  | PriceRule.And
  | PriceRule.Or
  | PriceRule.BondingLinear
export type PriceRuleJSON =
  | PriceRule.NoneJSON
  | PriceRule.AndJSON
  | PriceRule.OrJSON
  | PriceRule.BondingLinearJSON

export { TimeRangeType }

export type TimeRangeTypeKind =
  | TimeRangeType.BetweenHours
  | TimeRangeType.BetweenDays
  | TimeRangeType.BetweenHoursNegate
export type TimeRangeTypeJSON =
  | TimeRangeType.BetweenHoursJSON
  | TimeRangeType.BetweenDaysJSON
  | TimeRangeType.BetweenHoursNegateJSON

export { ActionAfter }

export type ActionAfterKind =
  | ActionAfter.MintingOut
  | ActionAfter.Supply
  | ActionAfter.Hours
  | ActionAfter.SellingOut
export type ActionAfterJSON =
  | ActionAfter.MintingOutJSON
  | ActionAfter.SupplyJSON
  | ActionAfter.HoursJSON
  | ActionAfter.SellingOutJSON

export { Rule }

export type RuleKind =
  | Rule.UnlocksAfter
  | Rule.UnwrapsAfter
  | Rule.WrappedSource
  | Rule.WrappedDestiny
export type RuleJSON =
  | Rule.UnlocksAfterJSON
  | Rule.UnwrapsAfterJSON
  | Rule.WrappedSourceJSON
  | Rule.WrappedDestinyJSON

export { AuthorityGateTypes }

export type AuthorityGateTypesKind =
  | AuthorityGateTypes.IPGate
  | AuthorityGateTypes.BiometricsGate
export type AuthorityGateTypesJSON =
  | AuthorityGateTypes.IPGateJSON
  | AuthorityGateTypes.BiometricsGateJSON

export { PoolConfig }

export type PoolConfigKind = PoolConfig.None
export type PoolConfigJSON = PoolConfig.NoneJSON

export { PoolType }

export type PoolTypeKind = PoolType.None | PoolType.Token | PoolType.MultiToken
export type PoolTypeJSON =
  | PoolType.NoneJSON
  | PoolType.TokenJSON
  | PoolType.MultiTokenJSON

export { PoolState }

export type PoolStateKind = PoolState.Available | PoolState.Closed
export type PoolStateJSON = PoolState.AvailableJSON | PoolState.ClosedJSON

export { PoolAccess }

export type PoolAccessKind = PoolAccess.Cpi | PoolAccess.Public
export type PoolAccessJSON = PoolAccess.CpiJSON | PoolAccess.PublicJSON

export { ExtraParameter }

export type ExtraParameterKind = ExtraParameter.None | ExtraParameter.Revealer
export type ExtraParameterJSON =
  | ExtraParameter.NoneJSON
  | ExtraParameter.RevealerJSON

export { AccountClass }

export type AccountClassKind =
  | AccountClass.HolderV1
  | AccountClass.StoreV1
  | AccountClass.SingleV1
  | AccountClass.PackV1
  | AccountClass.CardV1
  | AccountClass.PackReceiptV1
  | AccountClass.PackContentV1
  | AccountClass.PackOpenHolderV1
  | AccountClass.BuyTrackV1
  | AccountClass.SingleArchiveV1
  | AccountClass.PackArchiveV1
  | AccountClass.None
  | AccountClass.CreatorRegistryV1
  | AccountClass.CollectorGlobalRegistryV1
  | AccountClass.CollectorArtistRegistryV1
  | AccountClass.PackTraitsV1
  | AccountClass.PackUploadsV1
  | AccountClass.ZeroOpenHolderV1
  | AccountClass.BurnDepositV1
  | AccountClass.GlobalBurnTrackV1
  | AccountClass.ArtistBurnTrackV1
  | AccountClass.SecureHolderV1
  | AccountClass.RevealerForMeV1
  | AccountClass.ThreeIdV1
  | AccountClass.DonationRegistryV1
  | AccountClass.PoolVaultV1
export type AccountClassJSON =
  | AccountClass.HolderV1JSON
  | AccountClass.StoreV1JSON
  | AccountClass.SingleV1JSON
  | AccountClass.PackV1JSON
  | AccountClass.CardV1JSON
  | AccountClass.PackReceiptV1JSON
  | AccountClass.PackContentV1JSON
  | AccountClass.PackOpenHolderV1JSON
  | AccountClass.BuyTrackV1JSON
  | AccountClass.SingleArchiveV1JSON
  | AccountClass.PackArchiveV1JSON
  | AccountClass.NoneJSON
  | AccountClass.CreatorRegistryV1JSON
  | AccountClass.CollectorGlobalRegistryV1JSON
  | AccountClass.CollectorArtistRegistryV1JSON
  | AccountClass.PackTraitsV1JSON
  | AccountClass.PackUploadsV1JSON
  | AccountClass.ZeroOpenHolderV1JSON
  | AccountClass.BurnDepositV1JSON
  | AccountClass.GlobalBurnTrackV1JSON
  | AccountClass.ArtistBurnTrackV1JSON
  | AccountClass.SecureHolderV1JSON
  | AccountClass.RevealerForMeV1JSON
  | AccountClass.ThreeIdV1JSON
  | AccountClass.DonationRegistryV1JSON
  | AccountClass.PoolVaultV1JSON

export { GlobalState }

export type GlobalStateKind =
  | GlobalState.HiddenBySystem
  | GlobalState.Public
  | GlobalState.HiddenByUser
  | GlobalState.FlaggedPirate
  | GlobalState.WaitingGlobalApproval
export type GlobalStateJSON =
  | GlobalState.HiddenBySystemJSON
  | GlobalState.PublicJSON
  | GlobalState.HiddenByUserJSON
  | GlobalState.FlaggedPirateJSON
  | GlobalState.WaitingGlobalApprovalJSON

export { BurnType }

export type BurnTypeKind = BurnType.None | BurnType.InTX | BurnType.Progressed
export type BurnTypeJSON =
  | BurnType.NoneJSON
  | BurnType.InTXJSON
  | BurnType.ProgressedJSON

export { PaymentClass }

export type PaymentClassKind =
  | PaymentClass.PaymentV1
  | PaymentClass.BurnPaymentV1
  | PaymentClass.GatePaymentV1
export type PaymentClassJSON =
  | PaymentClass.PaymentV1JSON
  | PaymentClass.BurnPaymentV1JSON
  | PaymentClass.GatePaymentV1JSON

export { ItemClass }

export type ItemClassKind = ItemClass.Single | ItemClass.Pack
export type ItemClassJSON = ItemClass.SingleJSON | ItemClass.PackJSON

export { CardClass }

export type CardClassKind = CardClass.Normal
export type CardClassJSON = CardClass.NormalJSON

export { TokenProgramVersion }

export type TokenProgramVersionKind =
  | TokenProgramVersion.Original
  | TokenProgramVersion.Token2022
export type TokenProgramVersionJSON =
  | TokenProgramVersion.OriginalJSON
  | TokenProgramVersion.Token2022JSON

export { TokenStandard }

export type TokenStandardKind =
  | TokenStandard.NonFungible
  | TokenStandard.FungibleAsset
  | TokenStandard.Fungible
  | TokenStandard.NonFungibleEdition
export type TokenStandardJSON =
  | TokenStandard.NonFungibleJSON
  | TokenStandard.FungibleAssetJSON
  | TokenStandard.FungibleJSON
  | TokenStandard.NonFungibleEditionJSON

export { UseMethod }

export type UseMethodKind =
  | UseMethod.Burn
  | UseMethod.Multiple
  | UseMethod.Single
export type UseMethodJSON =
  | UseMethod.BurnJSON
  | UseMethod.MultipleJSON
  | UseMethod.SingleJSON
