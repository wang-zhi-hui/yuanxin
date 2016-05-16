//
//  UzysAssetsPickerController.m
//  UzysAssetsPickerController
//
//  Created by Uzysjung on 2014. 2. 12..
//  Copyright (c) 2014년 Uzys. All rights reserved.
//
#import "UzysAssetsPickerController.h"
#import "UzysAssetsViewCell.h"
#import "UzysWrapperPickerController.h"
#import "UzysGroupPickerView.h"
#import "FirstCollectionViewCell.h"
#import "CorePhotoPickerVCManager.h"
#import "CorePhoto.h"
#import "HMSingleton.h"

@interface UzysAssetsPickerController ()<UICollectionViewDataSource,UICollectionViewDelegate,UIImagePickerControllerDelegate,UINavigationControllerDelegate>
{
    NSInteger editTag;
}

@property (nonatomic,assign) BOOL showMsg;                                  //是否正在显示提示信息
@property(nonatomic,assign)int num;
@property(nonatomic,assign)int number;
@property (nonatomic, strong) NSMutableArray *images;
@property (nonatomic, strong) NSMutableArray *imageDataArr;


@property (weak, nonatomic) IBOutlet UIButton *switchBtn;
@property (weak, nonatomic) IBOutlet UIButton *btnDone;
@property (weak, nonatomic) IBOutlet UIView *navigationTop;
@property (weak, nonatomic) IBOutlet UIView *bottomView;
@property (weak, nonatomic) IBOutlet UISegmentedControl *segmentedControl;
@property (weak, nonatomic) IBOutlet UILabel *labelSelectedMedia;

@property (strong, nonatomic) IBOutlet UILabel *noticeLabel;

//@property (weak, nonatomic) IBOutlet UIButton *btnCamera;
@property (weak, nonatomic) IBOutlet UIButton *btnClose;

@property (strong, nonatomic) IBOutlet UIButton *selectedCountBtn;


@property (nonatomic, strong) UIView *noAssetView;
@property (nonatomic, strong) UICollectionView *collectionView;
@property (nonatomic, strong) UzysWrapperPickerController *picker;
@property (nonatomic, strong) UzysGroupPickerView *groupPicker;
//@property (nonatomic, strong) UzysGroupPickerViewController *groupPicker;

@property (nonatomic, strong) ALAssetsGroup *assetsGroup;
@property (nonatomic, strong) NSMutableArray *groups;
@property (nonatomic, strong) ALAssetsLibrary *assetsLibrary;

@property (nonatomic, strong) NSMutableArray *assets;
@property (nonatomic, assign) NSInteger numberOfPhotos;
@property (nonatomic, assign) NSInteger numberOfVideos;
@property (nonatomic, assign) NSInteger maximumNumberOfSelection;
@property (nonatomic, assign) NSInteger curAssetFilterType;


@property (strong, nonatomic) IBOutlet UILabel *msgLabel;

@property (strong, nonatomic) IBOutlet NSLayoutConstraint *c_msgLabelTopMargin;



- (IBAction)btnAction:(id)sender;
- (IBAction)indexDidChangeForSegmentedControl:(id)sender;

@end

@implementation UzysAssetsPickerController

#pragma mark - ALAssetsLibrary

+ (ALAssetsLibrary *)defaultAssetsLibrary
{
    static dispatch_once_t pred = 0;
    static ALAssetsLibrary *library = nil;
    dispatch_once(&pred,^
                  {
                      library = [[ALAssetsLibrary alloc] init];
                  });
    return library;
}


- (id)init
{
    self = [super initWithNibName:@"UzysAssetsPickerController" bundle:nil];
    if(self)
    {
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(assetsLibraryUpdated:) name:ALAssetsLibraryChangedNotification object:nil];
    }
    return self;
}
- (void)dealloc
{
    [[NSNotificationCenter defaultCenter] removeObserver:self name:ALAssetsLibraryChangedNotification object:nil];
    self.assetsLibrary = nil;
    self.assetsGroup = nil;
    self.assets = nil;
}
- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
    [self initVariable];
    [self initImagePicker];
    [self setupOneMediaTypeSelection];

    __weak typeof(self) weakSelf = self;
    [self setupGroup:^{
        [weakSelf.groupPicker.tableView selectRowAtIndexPath:[NSIndexPath indexPathForRow:0 inSection:0] animated:NO scrollPosition:UITableViewScrollPositionNone];
    } withSetupAsset:YES];
    [self setupLayout];
    [self setupCollectionView];
    [self setupGroupPickerview];
    [self initNoAssetView];
    
    //计数按钮圆角化
    self.selectedCountBtn.layer.cornerRadius=11.0f;
    self.msgLabel.text=[NSString stringWithFormat:@"提示：您最多可选 %li 张照片！",self.maximumNumberOfSelectionPhoto];
    
}

- (void)initVariable
{
    
    
    
//    self.assetsFilter = [ALAssetsFilter allPhotos];
    [self setAssetsFilter:[ALAssetsFilter allPhotos] type:1];
    self.maximumNumberOfSelection = self.maximumNumberOfSelectionPhoto;
    self.view.clipsToBounds = YES;
}
- (void)initImagePicker
{
    UzysWrapperPickerController *picker = [[UzysWrapperPickerController alloc] init];
//    picker.modalPresentationStyle = UIModalPresentationCurrentContext;
    picker.delegate = self;
    picker.allowsEditing = YES;
    picker.videoQuality = UIImagePickerControllerQualityTypeHigh;
    if ([UIImagePickerController isSourceTypeAvailable:UIImagePickerControllerSourceTypeCamera])
    {
        NSArray *availableMediaTypes =
        [UIImagePickerController availableMediaTypesForSourceType:
         UIImagePickerControllerSourceTypeCamera];
        NSMutableArray *mediaTypes = [NSMutableArray arrayWithArray:availableMediaTypes];

        if (_maximumNumberOfSelectionMedia == 0)
        {
            if (_maximumNumberOfSelectionPhoto == 0)
                [mediaTypes removeObject:@"public.image"];
            else if (_maximumNumberOfSelectionVideo == 0)
                [mediaTypes removeObject:@"public.movie"];
        }

        picker.sourceType = UIImagePickerControllerSourceTypeCamera;
        picker.mediaTypes = mediaTypes;
    }
    self.picker = picker;
}
- (void)setupLayout
{
//    UzysAppearanceConfig *appearanceConfig = [UzysAppearanceConfig sharedConfig];
  
    UIView *lineView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, [UIScreen mainScreen].bounds.size.width, 0.5)];
    lineView.backgroundColor = [UIColor colorWithWhite:0 alpha:0.15f];
    [self.bottomView addSubview:lineView];
}
- (void)setupGroupPickerview
{
    __weak typeof(self) weakSelf = self;
    self.groupPicker = [[UzysGroupPickerView alloc] initWithGroups:self.groups];
    self.groupPicker.blockTouchCell = ^(NSInteger row){
        [weakSelf changeGroup:row];
    };
    
    [self.view insertSubview:self.groupPicker aboveSubview:self.bottomView];
    
    [self.view bringSubviewToFront:self.navigationTop];
    
//    UzysGroupPickerView *groupPickerView=self.groupPicker;
//    
//    groupPickerView.translatesAutoresizingMaskIntoConstraints=NO;
//    
//    NSDictionary *views=NSDictionaryOfVariableBindings(groupPickerView);
//    
//    [self.view addConstraints:[NSLayoutConstraint constraintsWithVisualFormat:@"H:|-0-[groupPickerView]-0-|" options:0 metrics:nil views:views]];
//    [self.view addConstraints:[NSLayoutConstraint constraintsWithVisualFormat:@"V:|-0-[groupPickerView]-0-|" options:0 metrics:nil views:views]];
//    
// 


}
- (void)setupOneMediaTypeSelection
{
    if(_maximumNumberOfSelectionMedia > 0)
    {
//        self.assetsFilter = [ALAssetsFilter allAssets];
        [self setAssetsFilter:[ALAssetsFilter allAssets] type:0];
        self.maximumNumberOfSelection = self.maximumNumberOfSelectionMedia;
        self.segmentedControl.hidden = YES;
        self.labelSelectedMedia.hidden = NO;
        if(_maximumNumberOfSelection > 1)
            self.labelSelectedMedia.text = NSLocalizedStringFromTable(@"Choose media", @"UzysAssetsPickerController", nil);
        else
            self.labelSelectedMedia.text = NSLocalizedStringFromTable(@"Choose a media", @"UzysAssetsPickerController", nil);

    }
    else
    {
        if(_maximumNumberOfSelectionPhoto == 0)
        {
//            self.assetsFilter = [ALAssetsFilter allVideos];
            [self setAssetsFilter:[ALAssetsFilter allVideos] type:2];
            
            self.maximumNumberOfSelection = self.maximumNumberOfSelectionVideo;
            self.segmentedControl.hidden = YES;
            self.labelSelectedMedia.hidden = NO;
            if(_maximumNumberOfSelection > 1)
                self.labelSelectedMedia.text = NSLocalizedStringFromTable(@"Choose videos", @"UzysAssetsPickerController", nil);
            else
                self.labelSelectedMedia.text = NSLocalizedStringFromTable(@"Choose a video", @"UzysAssetsPickerController", nil);
        }
        else if(_maximumNumberOfSelectionVideo == 0)
        {
//            self.assetsFilter = [ALAssetsFilter allPhotos];
            [self setAssetsFilter:[ALAssetsFilter allPhotos] type:1];
            
            self.segmentedControl.selectedSegmentIndex = 0;
            self.maximumNumberOfSelection = self.maximumNumberOfSelectionPhoto;
            self.segmentedControl.hidden = YES;
            self.labelSelectedMedia.hidden = NO;
            if(_maximumNumberOfSelection >1)
                self.noticeLabel.text = [NSString stringWithFormat:@"最多选%li张",self.maximumNumberOfSelectionPhoto];
            else
                self.labelSelectedMedia.text = NSLocalizedStringFromTable(@"Choose a photo", @"UzysAssetsPickerController", nil);
        }
        else
        {
            self.segmentedControl.hidden = NO;
            self.labelSelectedMedia.hidden = YES;
        }

    }
}

- (void)setupCollectionView
{
    
    UICollectionViewFlowLayout *layout  = [[UICollectionViewFlowLayout alloc] init];
    
    if(IS_IPHONE_6_IOS8)
    {
        layout.itemSize = kThumbnailSize_IPHONE6;
    }
    else if(IS_IPHONE_6P_IOS8)
    {
        layout.itemSize = kThumbnailSize_IPHONE6P;
    }
    else
    {
        layout.itemSize                     = kThumbnailSize;
    }
    layout.sectionInset                 = UIEdgeInsetsMake(1.0, 0, 0, 0);
    layout.minimumInteritemSpacing      = 1.0;
    layout.minimumLineSpacing           = 1.0;

    UICollectionView *collectionView = [[UICollectionView alloc] initWithFrame:CGRectZero collectionViewLayout:layout];
    
    collectionView.translatesAutoresizingMaskIntoConstraints=NO;
    self.collectionView=collectionView;
    
    self.collectionView.allowsMultipleSelection = YES;
    [self.collectionView registerClass:[UzysAssetsViewCell class]
            forCellWithReuseIdentifier:kAssetsViewCellIdentifier];
    
    self.collectionView.delegate = self;
    self.collectionView.dataSource = self;
    self.collectionView.backgroundColor = [UIColor whiteColor];
    self.collectionView.bounces = YES;
    self.collectionView.alwaysBounceVertical = YES;
    [self.collectionView registerClass:[FirstCollectionViewCell class] forCellWithReuseIdentifier:@"UUCell"];
    [self.view insertSubview:self.collectionView atIndex:0];
    
    collectionView.contentInset=UIEdgeInsetsMake(64, 0, 49+2, 0);
    collectionView.contentOffset=CGPointMake(0, -64-2);
    
    NSDictionary *views=NSDictionaryOfVariableBindings(collectionView);
    
    [self.view addConstraints:[NSLayoutConstraint constraintsWithVisualFormat:@"H:|-0-[collectionView]-0-|" options:0 metrics:nil views:views]];
    
    [self.view addConstraints:[NSLayoutConstraint constraintsWithVisualFormat:@"V:|-0-[collectionView]-0-|" options:0 metrics:nil views:views]];
}
#pragma mark - Property
- (void)setAssetsFilter:(ALAssetsFilter *)assetsFilter type:(NSInteger)type
{
    _assetsFilter = assetsFilter;
    _curAssetFilterType = type;
}
#pragma mark - public methods
+ (void)setUpAppearanceConfig:(UzysAppearanceConfig *)config
{
    UzysAppearanceConfig *appearanceConfig = [UzysAppearanceConfig sharedConfig];
    appearanceConfig.assetSelectedImageName = config.assetSelectedImageName;
    appearanceConfig.assetDeselectedImageName = config.assetDeselectedImageName;
    appearanceConfig.cameraImageName = config.cameraImageName;
    appearanceConfig.finishSelectionButtonColor = config.finishSelectionButtonColor;
    appearanceConfig.assetsGroupSelectedImageName = config.assetsGroupSelectedImageName;
    appearanceConfig.closeImageName = config.closeImageName;
}

- (void)changeGroup:(NSInteger)item
{
    self.assetsGroup = self.groups[item];
    [self setupAssets:nil];
    [self.groupPicker.tableView selectRowAtIndexPath:[NSIndexPath indexPathForRow:item inSection:0] animated:NO scrollPosition:UITableViewScrollPositionNone];
}
- (void)changeAssetType:(BOOL)isPhoto endBlock:(voidBlock)endBlock
{
    if(isPhoto)
    {
        self.maximumNumberOfSelection = self.maximumNumberOfSelectionPhoto;
//        self.assetsFilter = [ALAssetsFilter allPhotos];
        [self setAssetsFilter:[ALAssetsFilter allPhotos] type:1];
        
        [self setupAssets:endBlock];
    }
    else
    {
        self.maximumNumberOfSelection = self.maximumNumberOfSelectionVideo;
//        self.assetsFilter = [ALAssetsFilter allVideos];
        [self setAssetsFilter:[ALAssetsFilter allVideos] type:2];
        
        [self setupAssets:endBlock];
        
    }
}
- (void)setupGroup:(voidBlock)endblock withSetupAsset:(BOOL)doSetupAsset
{
    if (!self.assetsLibrary)
    {
        self.assetsLibrary = [self.class defaultAssetsLibrary];
    }
    
    if (!self.groups)
        self.groups = [[NSMutableArray alloc] init];
    else
        [self.groups removeAllObjects];
    
    
    __weak typeof(self) weakSelf = self;
    
    ALAssetsFilter *assetsFilter = self.assetsFilter; // number of Asset 메쏘드 호출 시에 적용.
    
    ALAssetsLibraryGroupsEnumerationResultsBlock resultsBlock = ^(ALAssetsGroup *group, BOOL *stop) {
        __strong typeof(weakSelf) strongSelf = weakSelf;
        if (group)
        {
            [group setAssetsFilter:assetsFilter];
            NSInteger groupType = [[group valueForProperty:ALAssetsGroupPropertyType] integerValue];
            if(groupType == ALAssetsGroupSavedPhotos)
            {
                [strongSelf.groups insertObject:group atIndex:0];
                if(doSetupAsset)
                {
                    strongSelf.assetsGroup = group;
                    [strongSelf setupAssets:nil];
                }
            }
            else
            {
                if (group.numberOfAssets > 0)
                    [strongSelf.groups addObject:group];
            }
        }
        //traverse to the end, so reload groupPicker.
        else
        {
            dispatch_async(dispatch_get_main_queue(), ^{
                [weakSelf.groupPicker reloadData];
                NSUInteger selectedIndex = [weakSelf indexOfAssetGroup:weakSelf.assetsGroup inGroups:weakSelf.groups];
                if (selectedIndex != NSNotFound) {
                    [weakSelf.groupPicker.tableView selectRowAtIndexPath:[NSIndexPath indexPathForRow:selectedIndex inSection:0] animated:YES scrollPosition:UITableViewScrollPositionNone];
                }
                if(endblock)
                    endblock();
            });
        }
    };
    
    ALAssetsLibraryAccessFailureBlock failureBlock = ^(NSError *error) {
        __strong typeof(weakSelf) strongSelf = weakSelf;
        //접근이 허락 안되었을 경우
        [strongSelf showNotAllowed];
        strongSelf.segmentedControl.enabled = NO;
        strongSelf.btnDone.enabled = NO;

//        strongSelf.btnCamera.enabled = NO;
        [strongSelf setTitle:NSLocalizedStringFromTable(@"Not Allowed", @"UzysAssetsPickerController",nil)];
        
    };
    
    [self.assetsLibrary enumerateGroupsWithTypes:ALAssetsGroupAll
                                      usingBlock:resultsBlock
                                    failureBlock:failureBlock];
}

- (void)setupAssets:(voidBlock)successBlock
{
    NSString *name = [self.assetsGroup valueForProperty:ALAssetsGroupPropertyName];
    
    self.labelSelectedMedia.text=name;
    if (!self.assets)
        self.assets = [[NSMutableArray alloc] init];
    else
        [self.assets removeAllObjects];
    
    if(!self.assetsGroup)
    {
        self.assetsGroup = self.groups[0];
    }
    [self.assetsGroup setAssetsFilter:self.assetsFilter];
    __weak typeof(self) weakSelf = self;

    ALAssetsGroupEnumerationResultsBlock resultsBlock = ^(ALAsset *asset, NSUInteger index, BOOL *stop) {
        __strong typeof(weakSelf) strongSelf = weakSelf;
        if (asset)
        {
            [strongSelf.assets addObject:asset];
            
            NSString *type = [asset valueForProperty:ALAssetPropertyType];
            
            if ([type isEqual:ALAssetTypePhoto])
                strongSelf.numberOfPhotos ++;
            if ([type isEqual:ALAssetTypeVideo])
                strongSelf.numberOfVideos ++;
        }
        
        else
        {
            dispatch_async(dispatch_get_main_queue(), ^{
                [self reloadData];
                if(successBlock)
                    successBlock();
                
            });

        }
    };
    [self.assetsGroup enumerateAssetsWithOptions:NSEnumerationReverse usingBlock:resultsBlock];
}
- (void)reloadData
{
    [self.collectionView reloadData];
    [self.selectedCountBtn setTitle:[NSString stringWithFormat:@"%lu",(unsigned long)self.collectionView.indexPathsForSelectedItems
                            .count] forState:UIControlStateNormal];
//    self.labelSelectedMedia.text=
    [self showNoAssetsIfNeeded];
}
- (void)setAssetsCountWithSelectedIndexPaths:(NSArray *)indexPaths
{
    
    NSInteger count=indexPaths.count;
    self.btnDone.enabled=count!=0;
    [self.selectedCountBtn setTitle:[NSString stringWithFormat:@"%li",count] forState:UIControlStateNormal];
}

- (void)setTitle:(NSString *)title
{
    
    [super setTitle:title];
    self.labelSelectedMedia.text=title;
    [self.labelSelectedMedia setNeedsLayout];
    [self.labelSelectedMedia layoutIfNeeded];
}

#pragma mark - Asset Exception View
- (void)initNoAssetView
{
    UIView *noAssetsView    = [[UIView alloc] initWithFrame:self.collectionView.bounds];
    
    CGRect rect             = CGRectInset(self.collectionView.bounds, 10, 10);
    UILabel *title          = [[UILabel alloc] initWithFrame:rect];
    UILabel *message        = [[UILabel alloc] initWithFrame:rect];
    
    title.text              = NSLocalizedStringFromTable(@"No Photos or Videos", @"UzysAssetsPickerController", nil);
    title.font              = [UIFont systemFontOfSize:19.0];
    title.textColor         = [UIColor colorWithRed:153.0/255.0 green:153.0/255.0 blue:153.0/255.0 alpha:1];
    title.textAlignment     = NSTextAlignmentCenter;
    title.numberOfLines     = 5;
    title.tag               = kTagNoAssetViewTitleLabel;
    
    message.text            = NSLocalizedStringFromTable(@"You can sync photos and videos onto your iPhone using iTunes.", @"UzysAssetsPickerController",nil);
    message.font            = [UIFont systemFontOfSize:15.0];
    message.textColor       = [UIColor colorWithRed:153.0/255.0 green:153.0/255.0 blue:153.0/255.0 alpha:1];
    message.textAlignment   = NSTextAlignmentCenter;
    message.numberOfLines   = 5;
    message.tag             = kTagNoAssetViewMsgLabel;
    
    UIImageView *titleImage = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"UzysAssetPickerController.bundle/uzysAP_ico_no_image"]];
    titleImage.contentMode = UIViewContentModeCenter;
    titleImage.tag = kTagNoAssetViewImageView;
    self.btnDone.tag=kTagButtonDone;
    self.switchBtn.tag=kTagButtonGroupPicker;
    [title sizeToFit];
    [message sizeToFit];
    
    title.center            = CGPointMake(noAssetsView.center.x, noAssetsView.center.y - 10 - title.frame.size.height / 2 + 40);
    message.center          = CGPointMake(noAssetsView.center.x, noAssetsView.center.y + 10 + message.frame.size.height / 2 + 20);
    titleImage.center       = CGPointMake(noAssetsView.center.x, noAssetsView.center.y - 10 - titleImage.frame.size.height /2);
    [noAssetsView addSubview:title];
    [noAssetsView addSubview:message];
    [noAssetsView addSubview:titleImage];
    
    [self.collectionView addSubview:noAssetsView];
    self.noAssetView = noAssetsView;
    self.noAssetView.hidden = YES;
}

- (void)showNotAllowed
{
    self.title              = nil;
    
    UIView *lockedView      = [[UIView alloc] initWithFrame:self.collectionView.bounds];
    UIImageView *locked     = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"UzysAssetPickerController.bundle/uzysAP_ico_no_access"]];
    locked.contentMode      = UIViewContentModeCenter;
    
    CGRect rect             = CGRectInset(self.collectionView.bounds, 8, 8);
    UILabel *title          = [[UILabel alloc] initWithFrame:rect];
    UILabel *message        = [[UILabel alloc] initWithFrame:rect];
    
    title.text              = NSLocalizedStringFromTable(@"This app does not have access to your photos or videos.", @"UzysAssetsPickerController",nil);
    title.font              = [UIFont boldSystemFontOfSize:17.0];
    title.textColor         = [UIColor colorWithRed:129.0/255.0 green:136.0/255.0 blue:148.0/255.0 alpha:1];
    title.textAlignment     = NSTextAlignmentCenter;
    title.numberOfLines     = 5;
    
    message.text            = NSLocalizedStringFromTable(@"You can enable access in Privacy Settings.", @"UzysAssetsPickerController",nil);
    message.font            = [UIFont systemFontOfSize:14.0];
    message.textColor       = [UIColor colorWithRed:129.0/255.0 green:136.0/255.0 blue:148.0/255.0 alpha:1];
    message.textAlignment   = NSTextAlignmentCenter;
    message.numberOfLines   = 5;
    
    [title sizeToFit];
    [message sizeToFit];
    
    locked.center           = CGPointMake(lockedView.center.x, lockedView.center.y - locked.bounds.size.height /2 - 20);
    title.center            = locked.center;
    message.center          = locked.center;
    
    rect                    = title.frame;
    rect.origin.y           = locked.frame.origin.y + locked.frame.size.height + 10;
    title.frame             = rect;
    
    rect                    = message.frame;
    rect.origin.y           = title.frame.origin.y + title.frame.size.height + 5;
    message.frame           = rect;
    
    [lockedView addSubview:locked];
    [lockedView addSubview:title];
    [lockedView addSubview:message];
    [self.collectionView addSubview:lockedView];
}

- (void)showNoAssetsIfNeeded
{
    __weak typeof(self) weakSelf = self;
    
    voidBlock setNoImage = ^{
        UIImageView *imgView = (UIImageView *)[weakSelf.noAssetView viewWithTag:kTagNoAssetViewImageView];
        imgView.contentMode = UIViewContentModeCenter;
        imgView.image = [UIImage imageNamed:@"UzysAssetPickerController.bundle/uzysAP_ico_no_image"];
        
        UILabel *title = (UILabel *)[weakSelf.noAssetView viewWithTag:kTagNoAssetViewTitleLabel];
        title.text = NSLocalizedStringFromTable(@"No Photos", @"UzysAssetsPickerController",nil);
        UILabel *msg = (UILabel *)[weakSelf.noAssetView viewWithTag:kTagNoAssetViewMsgLabel];
        msg.text = NSLocalizedStringFromTable(@"You can sync photos onto your iPhone using iTunes.",@"UzysAssetsPickerController", nil);
    };
    voidBlock setNoVideo = ^{
        UIImageView *imgView = (UIImageView *)[weakSelf.noAssetView viewWithTag:kTagNoAssetViewImageView];
        imgView.image = [UIImage imageNamed:@"UzysAssetPickerController.bundle/uzysAP_ico_no_video"];
        DLog(@"no video");
        UILabel *title = (UILabel *)[weakSelf.noAssetView viewWithTag:kTagNoAssetViewTitleLabel];
        title.text = NSLocalizedStringFromTable(@"No Videos", @"UzysAssetsPickerController",nil);
        UILabel *msg = (UILabel *)[weakSelf.noAssetView viewWithTag:kTagNoAssetViewMsgLabel];
        msg.text = NSLocalizedStringFromTable(@"You can sync videos onto your iPhone using iTunes.",@"UzysAssetsPickerController", nil);

    };
    
    if(self.assets.count ==0)
    {
        self.noAssetView.hidden = NO;
        if(self.segmentedControl.hidden == NO)
        {
            if(self.segmentedControl.selectedSegmentIndex ==0)
            {
                setNoImage();
            }
            else
            {
                setNoVideo();
            }
        }
        else
        {
            if(self.maximumNumberOfSelectionMedia >0)
            {
                UIImageView *imgView = (UIImageView *)[self.noAssetView viewWithTag:kTagNoAssetViewImageView];
                imgView.image = [UIImage imageNamed:@"UzysAssetPickerController.bundle/uzysAP_ico_no_image"];
                DLog(@"no media");
                UILabel *title = (UILabel *)[self.noAssetView viewWithTag:kTagNoAssetViewTitleLabel];
                title.text = NSLocalizedStringFromTable(@"No Videos", @"UzysAssetsPickerController",nil);
                UILabel *msg = (UILabel *)[self.noAssetView viewWithTag:kTagNoAssetViewMsgLabel];
                msg.text = NSLocalizedStringFromTable(@"You can sync media onto your iPhone using iTunes.",@"UzysAssetsPickerController", nil);

            }
            else if(self.maximumNumberOfSelectionPhoto == 0)
            {
                setNoVideo();
            }
            else if(self.maximumNumberOfSelectionVideo == 0)
            {
                setNoImage();
            }
        }
    }
    else
    {
        self.noAssetView.hidden = YES;
    }
}


#pragma mark - Collection View Data Source

- (NSInteger)numberOfSectionsInCollectionView:(UICollectionView *)collectionView
{
    return 1;
}

- (NSInteger)collectionView:(UICollectionView *)collectionView numberOfItemsInSection:(NSInteger)section
{
    return self.assets.count + 1;
}

- (UICollectionViewCell *)collectionView:(UICollectionView *)collectionView cellForItemAtIndexPath:(NSIndexPath *)indexPath
{
    if (indexPath.row == 0) {
        FirstCollectionViewCell *cell = [collectionView dequeueReusableCellWithReuseIdentifier:@"UUCell" forIndexPath:indexPath];
      NSString *path = [[NSBundle mainBundle] pathForResource:@"asy" ofType:@"png"];
      cell.picture.image = [UIImage imageWithContentsOfFile:path];
      return cell;
    }
    
    static NSString *CellIdentifier = kAssetsViewCellIdentifier;
    
    UzysAssetsViewCell *cell = [collectionView dequeueReusableCellWithReuseIdentifier:CellIdentifier forIndexPath:indexPath];
    
    [cell applyData:[self.assets objectAtIndex:indexPath.row - 1]];
    
    return cell;
}

#pragma mark - Collection View Delegate

- (BOOL)collectionView:(UICollectionView *)collectionView shouldSelectItemAtIndexPath:(NSIndexPath *)indexPath
{
    
    BOOL didExceedMaximumNumberOfSelection = [collectionView indexPathsForSelectedItems].count >= self.maximumNumberOfSelection;
    if (didExceedMaximumNumberOfSelection && self.delegate && [self.delegate respondsToSelector:@selector(uzysAssetsPickerControllerDidExceedMaximumNumberOfSelection:)]) {
        [self.delegate uzysAssetsPickerControllerDidExceedMaximumNumberOfSelection:self];
        
        if(!self.showMsg){
            self.showMsg=YES;
            self.c_msgLabelTopMargin.constant=64.0f;
            [UIView animateWithDuration:.5f animations:^{
                self.msgLabel.alpha=1.0f;
                [self.msgLabel setNeedsLayout];
                [self.msgLabel layoutIfNeeded];
            } completion:^(BOOL finished) {
                dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(3.0f * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
                    self.c_msgLabelTopMargin.constant=0.0f;
                    [UIView animateWithDuration:1.0f animations:^{
                        self.msgLabel.alpha=0.0f;
                        [self.msgLabel setNeedsLayout];
                        [self.msgLabel layoutIfNeeded];
                    } completion:^(BOOL finished) {
                        self.showMsg=NO;
                    }];
                });
            }];
        }
        
        
    }
    return !didExceedMaximumNumberOfSelection;
}

- (void)collectionView:(UICollectionView *)collectionView didSelectItemAtIndexPath:(NSIndexPath *)indexPath
{
    if (indexPath.row == 0) {
        if ([UIImagePickerController isSourceTypeAvailable:UIImagePickerControllerSourceTypeCamera]) {
            
            UIImagePickerController * picker = [[UIImagePickerController alloc]init];
            picker.delegate = self;
            picker.allowsEditing = YES;  //是否可编辑
            //摄像头
            picker.sourceType = UIImagePickerControllerSourceTypeCamera;
            [self presentViewController:picker animated:YES completion:nil];
            
        }else{
            //如果没有提示用户
            UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Error" message:@"你没有摄像头" delegate:nil cancelButtonTitle:@"Drat!" otherButtonTitles:nil];
            [alert show];
        }
        
    }


    
    [self setAssetsCountWithSelectedIndexPaths:collectionView.indexPathsForSelectedItems];
}

- (void)collectionView:(UICollectionView *)collectionView didDeselectItemAtIndexPath:(NSIndexPath *)indexPath
{
    [self setAssetsCountWithSelectedIndexPaths:collectionView.indexPathsForSelectedItems];
}


#pragma mark - Actions

- (void)finishPickingAssets
{
  NSMutableArray *assets = [[NSMutableArray alloc] init];
//  NSMutableArray *assets2 = [[NSMutableArray alloc] init];
  for (NSIndexPath *indexPath in self.collectionView.indexPathsForSelectedItems)
  {
    [assets addObject:[self.assets objectAtIndex:indexPath.item - 1]];
  }
  
//  if (self.isEdite) {
//    
//    NSArray *photos=[CorePhoto photosWithAssets:assets];
//    [photos enumerateObjectsUsingBlock:^(CorePhoto *photo, NSUInteger idx, BOOL *stop) {
//      
//      UIImage *imageOne = photo.originalImage;
//      
//      UIImage *newImage = [self imageCompressForWidth:imageOne targetWidth:200];
//      
//      UIImageWriteToSavedPhotosAlbum(newImage, self, @selector(image:didFinishSavingWithError:contextInfo:), nil);
//      for (NSIndexPath *indexPath in self.collectionView.indexPathsForSelectedItems)
//      {
//        [assets2 addObject:[self.assets objectAtIndex:indexPath.item - 1]];
//      }
//      if([assets2 count]>0)
//      {
//        UzysAssetsPickerController *picker = (UzysAssetsPickerController *)self;
//        
//        if([picker.delegate respondsToSelector:@selector(uzysAssetsPickerController:didFinishPickingAssets:)])
//          [picker.delegate uzysAssetsPickerController:picker didFinishPickingAssets:assets2];
//        
//        [self dismissViewControllerAnimated:YES completion:^{
//          
//        }];
//      }
//     }];
//    }else{
  
    if([assets count]>0)
    {
        UzysAssetsPickerController *picker = (UzysAssetsPickerController *)self;
        
        if([picker.delegate respondsToSelector:@selector(uzysAssetsPickerController:didFinishPickingAssets:)])
            [picker.delegate uzysAssetsPickerController:picker didFinishPickingAssets:assets];
        
        [self dismissViewControllerAnimated:YES completion:^{
            
        }];
    }
//  }
}

-(UIImage *) imageCompressForWidth:(UIImage *)sourceImage targetWidth:(CGFloat)defineWidth
{
      CGSize imageSize = sourceImage.size;
      CGFloat width = imageSize.width;
      CGFloat height = imageSize.height;
      CGFloat targetWidth = defineWidth;
      CGFloat targetHeight = (targetWidth / width) * height;
      UIGraphicsBeginImageContext(CGSizeMake(targetWidth, targetHeight));
      [sourceImage drawInRect:CGRectMake(0,0,targetWidth,  targetHeight)];
      UIImage* newImage = UIGraphicsGetImageFromCurrentImageContext();
      UIGraphicsEndImageContext();
      return newImage;
}

     
#pragma mark - Helper methods
- (NSDictionary *)queryStringToDictionaryOfNSURL:(NSURL *)url
{
    NSArray *urlComponents = [url.query componentsSeparatedByString:@"&"];
    if (urlComponents.count <= 0)
    {
        return nil;
    }
    NSMutableDictionary *queryDict = [NSMutableDictionary dictionary];
    for (NSString *keyValuePair in urlComponents)
    {
        NSArray *pairComponents = [keyValuePair componentsSeparatedByString:@"="];
        [queryDict setObject:pairComponents[1] forKey:pairComponents[0]];
    }
    return [queryDict copy];
}

- (NSUInteger)indexOfAssetGroup:(ALAssetsGroup *)group inGroups:(NSArray *)groups
{
    NSString *targetGroupId = [group valueForProperty:ALAssetsGroupPropertyPersistentID];
    __block NSUInteger index = NSNotFound;
    [groups enumerateObjectsUsingBlock:^(id obj, NSUInteger idx, BOOL *stop) {
        ALAssetsGroup *g = obj;
        NSString *gid = [g valueForProperty:ALAssetsGroupPropertyPersistentID];
        if ([gid isEqualToString:targetGroupId])
        {
            index = idx;
            *stop = YES;
        }

    }];
    return index;
}

#pragma mark - Notification

- (void)assetsLibraryUpdated:(NSNotification *)notification
{
    //recheck here
    if(![notification.name isEqualToString:ALAssetsLibraryChangedNotification])
    {
        return ;
    }
    __weak typeof(self) weakSelf = self;
    dispatch_async(dispatch_get_main_queue(), ^{
        __strong typeof(self) strongSelf = weakSelf;
        NSDictionary* info = [notification userInfo];
//        NSSet *updatedAssets = [info objectForKey:ALAssetLibraryUpdatedAssetsKey];
        NSSet *updatedAssetGroup = [info objectForKey:ALAssetLibraryUpdatedAssetGroupsKey];
        NSSet *deletedAssetGroup = [info objectForKey:ALAssetLibraryDeletedAssetGroupsKey];
        NSSet *insertedAssetGroup = [info objectForKey:ALAssetLibraryInsertedAssetGroupsKey];
//        DLog(@"-------------+");
//        DLog(@"updated assets:%@", updatedAssets);
//        DLog(@"updated asset group:%@", updatedAssetGroup);
//        DLog(@"deleted asset group:%@", deletedAssetGroup);
//        DLog(@"inserted asset group:%@", insertedAssetGroup);
//        DLog(@"-------------=");
        
        if(info == nil)
        {
            //AllClear
            [strongSelf setupGroup:nil withSetupAsset:YES];
            return;
        }
        
        if(info.count == 0)
        {
            return;
        }
        
        if (deletedAssetGroup.count > 0 || insertedAssetGroup.count > 0 || updatedAssetGroup.count >0)
        {
            BOOL currentAssetsGroupIsInDeletedAssetGroup = NO;
            BOOL currentAssetsGroupIsInUpdatedAssetGroup = NO;
            NSString *currentAssetGroupId = [strongSelf.assetsGroup valueForProperty:ALAssetsGroupPropertyPersistentID];
            //check whether user deleted a chosen assetGroup.
            for (NSURL *groupUrl in deletedAssetGroup)
            {
                NSDictionary *queryDictionInURL = [strongSelf queryStringToDictionaryOfNSURL:groupUrl];
                if ([queryDictionInURL[@"id"] isEqualToString:currentAssetGroupId])
                {
                    currentAssetsGroupIsInDeletedAssetGroup = YES;
                    break;
                }
            }
            for (NSURL *groupUrl in updatedAssetGroup)
            {
                NSDictionary *queryDictionInURL = [strongSelf queryStringToDictionaryOfNSURL:groupUrl];
                if ([queryDictionInURL[@"id"] isEqualToString:currentAssetGroupId])
                {
                    currentAssetsGroupIsInUpdatedAssetGroup = YES;
                    break;
                }
            }
            
            if (currentAssetsGroupIsInDeletedAssetGroup || [strongSelf.assetsGroup numberOfAssets]==0)
            {
                //if user really deletes a chosen assetGroup, make it self.groups[0] to be default selected.
                [strongSelf setupGroup:^{
                    [strongSelf.groupPicker reloadData];
                    [strongSelf.groupPicker.tableView selectRowAtIndexPath:[NSIndexPath indexPathForRow:0 inSection:0] animated:NO scrollPosition:UITableViewScrollPositionNone];
                } withSetupAsset:YES];
                return;
            }
            else
            {
                if(currentAssetsGroupIsInUpdatedAssetGroup)
                {
                    NSMutableArray *selectedItems = [NSMutableArray array];
                    NSArray *selectedPath = strongSelf.collectionView.indexPathsForSelectedItems;
                    
                    for (NSIndexPath *idxPath in selectedPath)
                    {
                        [selectedItems addObject:[strongSelf.assets objectAtIndex:idxPath.row]];
                    }
                    NSInteger beforeAssets = strongSelf.assets.count;
                    [strongSelf setupAssets:^{
                        for (ALAsset *item in selectedItems)
                        {
                            for(ALAsset *asset in strongSelf.assets)
                            {
                                if([[[asset valueForProperty:ALAssetPropertyAssetURL] absoluteString] isEqualToString:[[item valueForProperty:ALAssetPropertyAssetURL] absoluteString]])
                                {
                                    NSUInteger idx = [strongSelf.assets indexOfObject:asset];
                                    NSIndexPath *newPath = [NSIndexPath indexPathForRow:idx inSection:0];
                                    [strongSelf.collectionView selectItemAtIndexPath:newPath animated:NO scrollPosition:UICollectionViewScrollPositionNone];
                                }
                            }
                        }
                        [strongSelf setAssetsCountWithSelectedIndexPaths:strongSelf.collectionView.indexPathsForSelectedItems];
                        if(strongSelf.assets.count > beforeAssets)
                        {
                            [strongSelf.collectionView setContentOffset:CGPointMake(0, 0) animated:NO];
                        }

                    }];
                    [strongSelf setupGroup:^{
                        [strongSelf.groupPicker reloadData];
                    } withSetupAsset:NO];
                    

                }
                else
                {
                    [strongSelf setupGroup:^{
                        [strongSelf.groupPicker reloadData];
                    } withSetupAsset:NO];
                    return;
                }
            }
            
        }
        
        
    });
}


#pragma mark - Control Action
- (IBAction)btnAction:(id)sender {

    UIButton *btn = (UIButton *)sender;
    NSInteger tag=btn.tag;
    
    switch (tag) {
        case kTagButtonCamera:
        {
            if (![UIImagePickerController isSourceTypeAvailable:UIImagePickerControllerSourceTypeCamera]) {
                NSString *title = NSLocalizedStringFromTable(@"Error", @"UzysAssetsPickerController", nil);
                NSString *message = NSLocalizedStringFromTable(@"Device has no camera", @"UzysAssetsPickerController", nil);
                UIAlertView *myAlertView = [[UIAlertView alloc] initWithTitle:title message:message delegate:nil cancelButtonTitle:@"OK" otherButtonTitles: nil];
                [myAlertView show];
            }
            else
            {
                __weak typeof(self) weakSelf = self;
                [self presentViewController:self.picker animated:YES completion:^{
                    __strong typeof(self) strongSelf = weakSelf;
                    //카메라 화면으로 가면 강제로 카메라 롤로 변경.
                    NSString *curGroupName =[[strongSelf.assetsGroup valueForProperty:ALAssetsGroupPropertyURL] absoluteString];
                    NSString *cameraRollName = [[strongSelf.groups[0] valueForProperty:ALAssetsGroupPropertyURL] absoluteString];
                    
                    if(![curGroupName isEqualToString:cameraRollName] )
                    {
                        strongSelf.assetsGroup = strongSelf.groups[0];
                        [strongSelf changeGroup:0];
                    }
                }];
            }
        }
            break;
        case kTagButtonClose:
        {
            if([self.delegate respondsToSelector:@selector(uzysAssetsPickerControllerDidCancel:)])
            {
                [self.delegate uzysAssetsPickerControllerDidCancel:self];
            }
            [self dismissViewControllerAnimated:YES completion:^{
                
            }];
        }
            break;
        case kTagButtonGroupPicker:
        {
            [self.groupPicker toggle];

        }
            break;
        case kTagButtonDone:
            [self finishPickingAssets];
            break;
        default:
            break;
    }
}

- (IBAction)indexDidChangeForSegmentedControl:(id)sender {
    UISegmentedControl *segmentedControl = (UISegmentedControl *) sender;
    NSInteger selectedSegment = segmentedControl.selectedSegmentIndex;
    if(selectedSegment ==0)
    {
        [self changeAssetType:YES endBlock:nil];
    }
    else
    {
        [self changeAssetType:NO endBlock:nil];
    }
}
#pragma mark - 照片自动已选取
- (void)saveAssetsAction:(NSURL *)assetURL error:(NSError *)error isPhoto:(BOOL)isPhoto {
    if(error)
        return;
    __weak typeof(self) weakSelf = self;
    [self.assetsLibrary assetForURL:assetURL resultBlock:^(ALAsset *asset) {
        dispatch_async(dispatch_get_main_queue(), ^{
            if (asset ==nil)
            {
                return ;
            }
            if(self.curAssetFilterType == 0 || (self.curAssetFilterType ==1 && isPhoto ==YES) || (self.curAssetFilterType == 2 && isPhoto ==NO))
            {
                NSMutableArray *selectedItems = [NSMutableArray array];
                NSArray *selectedPath = self.collectionView.indexPathsForSelectedItems;
                
                for (NSIndexPath *idxPath in selectedPath)
                {
                    [selectedItems addObject:[self.assets objectAtIndex:idxPath.row]];
                }
                
                [self.assets insertObject:asset atIndex:0];
                [self reloadData];

                for (ALAsset *item in selectedItems)
                {
                    for(ALAsset *asset in self.assets)
                    {
                        if([[[asset valueForProperty:ALAssetPropertyAssetURL] absoluteString] isEqualToString:[[item valueForProperty:ALAssetPropertyAssetURL] absoluteString]])
                        {
                            NSUInteger idx = [self.assets indexOfObject:asset];
                            NSIndexPath *newPath = [NSIndexPath indexPathForRow:idx inSection:0];
// 根据index位置设置选中状态
                            [self.collectionView selectItemAtIndexPath:newPath animated:NO scrollPosition:UICollectionViewScrollPositionNone];
                        }
                    }
                }
//                [self.collectionView setContentOffset:CGPointMake(0, 0) animated:NO];
                
                if(self.maximumNumberOfSelection > self.collectionView.indexPathsForSelectedItems.count)
                {
                    NSIndexPath *newPath = [NSIndexPath indexPathForRow:0 inSection:0];
                    [self.collectionView selectItemAtIndexPath:newPath animated:NO scrollPosition:UICollectionViewScrollPositionNone];
                }
                [self setAssetsCountWithSelectedIndexPaths:self.collectionView.indexPathsForSelectedItems];
            }
            
            dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
                __strong typeof(weakSelf) strongSelf = weakSelf;
                [[NSNotificationCenter defaultCenter] addObserver:strongSelf selector:@selector(assetsLibraryUpdated:) name:ALAssetsLibraryChangedNotification object:nil];
            });
            
            
        });
        
    } failureBlock:^(NSError *err){

        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            __strong typeof(weakSelf) strongSelf = weakSelf;
            [[NSNotificationCenter defaultCenter] addObserver:strongSelf selector:@selector(assetsLibraryUpdated:) name:ALAssetsLibraryChangedNotification object:nil];
        });
        
    }];
}

/*

 ALAssetsLibrary *library = [[ALAssetsLibrary alloc] init];
 // Request to save the image to camera roll
 [library writeImageToSavedPhotosAlbum:[viewImage CGImage] orientation:(ALAssetOrientation)[viewImage imageOrientation] completionBlock:^(NSURL *assetURL, NSError *error){
 if (error) {
 NSLog(@"error");
 } else {
 NSLog(@"url %@", assetURL);
 }
 }];

*/

#pragma mark - UIImagerPickerDelegate
- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info
{
//  if (self.isEdite) {
//    
//    UIImage *pickImage = info[UIImagePickerControllerEditedImage];
//    
//    UIImageWriteToSavedPhotosAlbum(pickImage, self, @selector(image:didFinishSavingWithError:contextInfo:), nil);
//    
//    [picker dismissViewControllerAnimated:YES completion:^{
//      
//      NSMutableArray *assets = [[NSMutableArray alloc] init];
//      
//      for (NSIndexPath *indexPath in self.collectionView.indexPathsForSelectedItems)
//      {
//        [assets addObject:[self.assets objectAtIndex:indexPath.item - 1]];
//      }
//      
//      if([assets count]>0)
//      {
//        UzysAssetsPickerController *picker = (UzysAssetsPickerController *)self;
//        
//        if([picker.delegate respondsToSelector:@selector(uzysAssetsPickerController:didFinishPickingAssets:)])
//          [picker.delegate uzysAssetsPickerController:picker didFinishPickingAssets:assets];
//        
//        [self dismissViewControllerAnimated:YES completion:^{
//          
//        }];
//      }
//    }];
//    
//  }else{
    UIImage *pickImage = info[UIImagePickerControllerOriginalImage];
  
    UIImageWriteToSavedPhotosAlbum(pickImage, self, @selector(image:didFinishSavingWithError:contextInfo:), nil);
    
    [picker dismissViewControllerAnimated:YES completion:^{
        
        NSMutableArray *assets = [[NSMutableArray alloc] init];
        
        for (NSIndexPath *indexPath in self.collectionView.indexPathsForSelectedItems){
        
            [assets addObject:[self.assets objectAtIndex:indexPath.item - 1]];
          }
      
        if([assets count]>0){
        
            UzysAssetsPickerController *picker = (UzysAssetsPickerController *)self;
            
            if([picker.delegate respondsToSelector:@selector(uzysAssetsPickerController:didFinishPickingAssets:)])
                [picker.delegate uzysAssetsPickerController:picker didFinishPickingAssets:assets];
            
            [self dismissViewControllerAnimated:YES completion:^{
                
            }];
          }
    }];
//  }
  
}



- (void)image:(UIImage*)image didFinishSavingWithError:(NSError*)error contextInfo:(void*)contextInfo
{
    
}


                                        
- (void)imagePickerControllerDidCancel:(UIImagePickerController *)picker
{
    [picker dismissViewControllerAnimated:YES completion:^{
        
    }];
}

#pragma mark - UIViewController Property

- (UIStatusBarStyle)preferredStatusBarStyle
{
    return UIStatusBarStyleDefault;
}
- (UIViewController *)childViewControllerForStatusBarHidden
{
    return nil;
}
- (BOOL)prefersStatusBarHidden
{
    return NO;
}



@end