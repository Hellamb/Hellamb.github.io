var difficulty = 0;
var playersAmount = 0;
var board =[
    ['W','B','W','B','W'],
    ['B','W','B','W','B'],
    ['W','B','W','B','W'],
    ['B','W','B','W','B'],
    ['W','B','W','B','W'],
    ['B','W','B','W','B'],]

$(document).ready(function(){
    //Присваивание событий при нажатии
    $('#1p-btn').click(function(){setPlayers(1)});
    $('#2p-btn').click(function(){setPlayers(2)});
    $('#easy-btn').click(function(){setDifficulty(1)});
    $('#medium-btn').click(function(){setDifficulty(2)});
    $('#hard-btn').click(function(){setDifficulty(3)});
    $('#start-menu-btn').click(function(){startGame()});
    $('#restart-btn').click(function(){window.location.reload()});

    //Установка количества игроков
    function setPlayers(players)
    {
        playersAmount = players;
        let startButton = $('#start-menu-btn');
        if(players==1)
        {
            //Замена состояния кнопок
            startButton.attr('disabled', true);
            startButton.attr('class','btn btn-outline-dark btn-lg');
            $('#difficulty-text').removeClass('neon-text-disabled');
            $('#difficulty-text').addClass('neon-text');
            $('#easy-btn').removeAttr('disabled');
            $('#medium-btn').removeAttr('disabled');
            $('#hard-btn').removeAttr('disabled');
        }
        if(players==2)
        {
            //Замена состояния кнопок
            startButton.removeAttr('disabled');
            startButton.attr('class','btn btn-outline-light btn-lg');
            $('#difficulty-text').removeClass('neon-text');
            $('#difficulty-text').addClass('neon-text-disabled');
            $('#easy-btn').attr('disabled', true);
            $('#medium-btn').attr('disabled', true);
            $('#hard-btn').attr('disabled', true);
        }
    }
    //Установка сложности
    function setDifficulty(dif)
    {
        difficulty = dif;
        let startButton = $('#start-menu-btn');
        startButton.removeAttr('disabled');
        //Замена цвета кнопки от сложности
        if(dif==1){
            startButton.attr('class','btn btn-outline-success btn-lg')}
        if(dif==2){
            startButton.attr('class','btn btn-outline-warning btn-lg')}
        if(dif==3){
            startButton.attr('class','btn btn-outline-danger btn-lg')}
    }

    //Переход к началу игры
    function startGame()
    {
        $("#settings-menu").addClass('hidden');
        $(".logo").animate({
            "width": "50%"
        },500);
        $("#game-board").removeClass('hidden');
        $(".light-field").animate({
            "width": "100px",
            "height": "100px"
        },500);
        $(".dark-field").animate({
            "width": "100px",
            "height": "100px"
        },500);
        //Передача хода белому
        playerTurn("W"); 
    }

    //Начало хода игрока определённого цвета
    //Даёт выбрать первую фишку
    function playerTurn(color)
    {
        $('.black-checker-img').unbind()
        $('.white-checker-img').unbind()
        if(color=="W"){
            $('#turn-text').text('Ход Белых');
            $('.black-checker-img').unbind();
            $('.white-checker-img').click(function(){selectedFirst(color, this)});
            $('.black-checker-img').removeClass("turn-checker");
            $('.white-checker-img').addClass("turn-checker");
        }
        if(color=="B"){
            $('#turn-text').text('Ход Чёрных');
            $('.white-checker-img').unbind();
            $('.black-checker-img').click(function(){selectedFirst(color, this)});
            $('.white-checker-img').removeClass("turn-checker");
            $('.black-checker-img').addClass("turn-checker");
        }
    }
    //Выбор первой фишки
    function selectedFirst(color, context)
    {
        let opColor;
        if(color=='W'){opColor="B"};
        if(color=='B'){opColor="W"};
        //определение координаты выбраной фишки и её id
        let beaterID = "#"+$(context).parent().attr('id');
        let row = beaterID[2]-1;
        let col = beaterID[3]-1;
        //очистка возможных целей
        $('.black-checker-img').removeClass("in-range");
        $('.white-checker-img').removeClass("in-range");
        if(color=='W'){$('.black-checker-img').unbind()}
        if(color=='B'){$('.white-checker-img').unbind()}

        //Присваивание событий при нажатии, для фишек, которые могут стать целью
        if(row>0 && board[row-1][col]==opColor)
        {
            let i = row;
            let j = col+1;
            let curID = "#f"+i+j;
            $(curID).children().addClass("in-range");
            $(curID).children().click(function(){selectedSecond(color, this, beaterID)});
        }
        if(row<board.length-1 && board[row+1][col]==opColor)
        {
            let i = row+2;
            let j = col+1;
            let curID = "#f"+i+j;
            $(curID).children().addClass("in-range");
            $(curID).children().click(function(){selectedSecond(color, this, beaterID)});
        }
        if(col>0 && board[row][col-1]==opColor)
        {
            let i = row+1;
            let j = col;
            let curID = "#f"+i+j;
            $(curID).children().addClass("in-range");
            $(curID).children().click(function(){selectedSecond(color, this, beaterID)});
        }
        if(col<board[0].length-1 && board[row][col+1]==opColor)
        {
            let i = row+1;
            let j = col+2;
            let curID = "#f"+i+j;
            $(curID).children().addClass("in-range");
            $(curID).children().click(function(){selectedSecond(color, this, beaterID)});
        }
    }
    //Выбор второй фишки
    function selectedSecond(color, context, beaterID)
    {
        let opColor;
        if(color=='W'){opColor="B"};
        if(color=='B'){opColor="W"};
        //определение координаты выбраной фишки
        let row = $(context).parent().attr('id')[1]-1;
        let col = $(context).parent().attr('id')[2]-1;
        //очистка свойств цели
        $('.black-checker-img').removeClass("in-range");
        $('.white-checker-img').removeClass("in-range");
        //Удаление походившей фишки
        let beaterRow = beaterID[2]-1;
        let beaterCol = beaterID[3]-1; 
        $(beaterID).empty();
        board[beaterRow][beaterCol] = 'N';

        //Замена фишки на доске
        if(color=="W"){
            $(context).attr('src','materials/wh-checker.png');
            $(context).attr('class', 'white-checker-img');
            board[row][col] = 'W'
        }
        if(color=="B"){
            $(context).attr('src','materials/bl-checker.png');
            $(context).attr('class', 'black-checker-img');
            board[row][col] = 'B'
        }

        //Проверка на победу
        if(fitness(board, color) == 0){showWin(color);}
        //Передача хода в зависимости от условий
        if(playersAmount==2 && color=="W"){playerTurn("B")}
        if(playersAmount==2 && color=="B"){playerTurn("W")}
        if(playersAmount==1){
            $('#turn-text').text('Ход Чёрных');
            setTimeout(function() {
                computerTurn();
              }, 200)
        }
    }


    //Ход компьютера, чёрный цвет
    function computerTurn()
    {

        let worstFitnessInTurnArr = [];
        let nextTurnList =[];
        let deepTurnList=[];
        let utilityList1=[];
        let utilityList2=[];
        //Заполнение списка возможными ходами
        nextTurnList = makeBoardsList(board, "B", -1, nextTurnList);
        for(let i=0; i< nextTurnList.length; i++)
        {
            nextTurnList[i].parent = i;
        }
        //Если есть победа на следующем ходу, то присваивать победу
        for(let i=0; i<nextTurnList.length ;i++){
            if(nextTurnList[i].fitness==0){showWin("B")}}
        // Заполнение списка возможных ходов противника
        deepTurnList = nextTurnList;
        let bestFit = 100;
        let bestBoardIndex = 0;

        if(difficulty>=2)
        {
            for(let i=0; i<deepTurnList.length ;i++){
                utilityList1 = makeBoardsList(deepTurnList[i].board, "W", i, utilityList1);
            }
            for(let i=0; i<utilityList1.length ;i++){
                utilityList2 = makeBoardsList(utilityList1[i].board, "B", utilityList1[i].parent, utilityList2);
            } 
            deepTurnList = utilityList2;
        }

        // if(difficulty>=3)
        // {
        //     for(let i=0; i<deepTurnList.length ;i++){
        //         utilityList1 = makeBoardsList(deepTurnList[i].board, "W", i, utilityList1);
        //     }
        //     for(let i=0; i<utilityList1.length ;i++){
        //         utilityList2 = makeBoardsList(utilityList1[i].board, "B", utilityList1[i].parent, utilityList2);
        //     } 
        //     deepTurnList = utilityList2;
        // }

        bestBoardIndex = findIndex("B", deepTurnList)
        newBoard = nextTurnList[bestBoardIndex].board;
        let nID;
        let bID;
        for(row=0;row<board.length; row++){
            for(col=0; col<board[0].length;col++){
                if(board[row][col] != newBoard[row][col] && newBoard[row][col] == "N"){
                    let m =row+1;
                    let n = col+1;
                    nID = "#f"+m+n;
                }
                if(board[row][col] != newBoard[row][col] && newBoard[row][col] == "B"){
                    let m =row+1;
                    let n = col+1;
                    bID = "#f"+m+n;
                }
            }
        }

        board=newBoard;
        $(nID).empty();
        $(bID).children().attr("class", "black-checker-img");
        $(bID).children().attr("src", "materials/bl-checker.png");
        //Передача хода
        playerTurn("W");
    }

    function findIndex(color, list)
    {
        let opColor;
        if(color=='W'){opColor="B"};
        if(color=='B'){opColor="W"};

        let bestWorstPar = list[0].parent
        let bestWorstFit = list[0].fitness
        let lastParent = list[0].parent;
        let worstFit = list[0].fitness
        let isParentSkip = false;
        for(let i=0; i<list.length;i++)
        {
            console.log(i)
            let board = list[i].board;
            if(isParentSkip && list[i].parent==lastParent){continue;}
            else(isParentSkip && list[i].parent!=lastParent )
            {
                isParentSkip = false;
            }
            for(row=0;row<board.length;row++)
            {
                for(col=0; col<board[0].length;col++)
                {
                    let isBot = row>0 && board[row-1][col]==opColor && board[row][col]==color;
                    let isTop = row<board.length-1 && board[row+1][col]==opColor && board[row][col]==color;
                    let isLeft = col>0 && board[row][col-1]==opColor && board[row][col]==color;
                    let isRight = col<board[0].length-1 && board[row][col+1]==opColor && board[row][col]==color;

                    if(isBot)
                    {
                        let newBoard = JSON.parse(JSON.stringify(board));
                        newBoard[row][col] = 'N';
                        newBoard[row-1][col] = color;
                        let fit = fitness(newBoard, color);
                        let ut = utilityGetWorst(bestWorstPar, bestWorstFit, lastParent, worstFit, fit,list[i].parent);
                        bestWorstFit = ut.bestWorstFit;
                        bestWorstPar = ut.bestWorstPar;
                        lastParent = ut.lastParent;
                        worstFit = ut.worstFit;
                        isParentSkip = ut.isParentSkip;
                        if(isParentSkip){break}
                    }
                    if(isTop)
                    {
                        let newBoard = JSON.parse(JSON.stringify(board));
                        newBoard[row][col] = 'N';
                        newBoard[row+1][col] = color;
                        let fit = fitness(newBoard, color);
                        let ut = utilityGetWorst(bestWorstPar, bestWorstFit, lastParent, worstFit, fit,list[i].parent);
                        bestWorstFit = ut.bestWorstFit;
                        bestWorstPar = ut.bestWorstPar;
                        lastParent = ut.lastParent;
                        worstFit = ut.worstFit;
                        isParentSkip = ut.isParentSkip;
                        if(isParentSkip){break}
                    }
                    if(isLeft)
                    {
                        let newBoard = JSON.parse(JSON.stringify(board));
                        newBoard[row][col] = 'N';
                        newBoard[row][col-1] = color;
                        let fit = fitness(newBoard, color);
                        let ut = utilityGetWorst(bestWorstPar, bestWorstFit, lastParent, worstFit, fit,list[i].parent);
                        bestWorstFit = ut.bestWorstFit;
                        bestWorstPar = ut.bestWorstPar;
                        lastParent = ut.lastParent;
                        worstFit = ut.worstFit;
                        isParentSkip = ut.isParentSkip;
                        if(isParentSkip){break}
                    }
                    if(isRight)
                    {
                        let newBoard = JSON.parse(JSON.stringify(board));
                        newBoard[row][col] = 'N';
                        newBoard[row][col+1] = color;
                        let fit = fitness(newBoard, color);
                        let ut = utilityGetWorst(bestWorstPar, bestWorstFit, lastParent, worstFit, fit,list[i].parent);
                        bestWorstFit = ut.bestWorstFit;
                        bestWorstPar = ut.bestWorstPar;
                        lastParent = ut.lastParent;
                        worstFit = ut.worstFit;
                        isParentSkip = ut.isParentSkip;
                        if(isParentSkip){break}
                    }
                }
                if(isParentSkip){break};
            }
            console.log("end")
        }
        return bestWorstPar;
   }

   function utilityGetWorst(bestWorstPar, bestWorstFit, lastParent, worstFit, fit, parent)
   {
        let isParentSkip = false;
        if(parent !=lastParent)
        {
            let isBetter =    (worstFit%2==1 &&(bestWorstFit%2==0 || bestWorstFit>worstFit)) 
                            ||(worstFit%2==0 && bestWorstFit%2==0 && worstFit>bestWorstFit)
            if(isBetter)
            {
                bestWorstPar = lastParent;
                bestWorstFit = worstFit; 
            }
            lastParent = parent;
            worstFit = fit;
        }else
        {
            let isWorse = (fit%2==0 && (fit<worstFit || worstFit%2==1)) || (worstFit %2==1 && fit>worstFit && fit%2==1);

            if(isWorse)
            {
                worstFit = fit;
                if(parent != 0)
                {
                    let isWorst = (fit%2==0 && (fit<bestWorstFit || bestWorstFit%2==1)) 
                                || (bestWorstFit %2==1 && fit>bestWorstFit && fit%2==1);
                    if(isWorst)
                    {
                        isParentSkip = true;
                    }
                }
            }
        }

        return{
            bestWorstPar,
            bestWorstFit,
            lastParent,
            worstFit,
            isParentSkip
        }
   }

    //Принимает доску, цвет, того, кто на ней ходит, нужного родителя и список для заполнения
    //Возвращает список возможных вариантов хода в объектах с родителем и ценностью
    function makeBoardsList(board, color, parent, list)
    {
        let opColor;
        if(color=='W'){opColor="B"};
        if(color=='B'){opColor="W"};

        for(row=0;row<board.length;row++)
        {
            for(col=0; col<board[0].length;col++)
            {
                let isBot = row>0 && board[row-1][col]==opColor && board[row][col]==color;
                let isTop = row<board.length-1 && board[row+1][col]==opColor && board[row][col]==color;
                let isLeft = col>0 && board[row][col-1]==opColor && board[row][col]==color;
                let isRight = col<board[0].length-1 && board[row][col+1]==opColor && board[row][col]==color;

                if(isBot)
                {
                    let newBoard = JSON.parse(JSON.stringify(board));
                    newBoard[row][col] = 'N';
                    newBoard[row-1][col] = color;
                    let fit = fitness(newBoard, color);
                    list.push(makeBoardObj(newBoard, parent, fit));
                }
                if(isTop)
                {
                    let newBoard = JSON.parse(JSON.stringify(board));
                    newBoard[row][col] = 'N';
                    newBoard[row+1][col] = color;
                    let fit = fitness(newBoard, color);
                    list.push(makeBoardObj(newBoard, parent, fit));
                }
                if(isLeft)
                {
                    let newBoard = JSON.parse(JSON.stringify(board));
                    newBoard[row][col] = 'N';
                    newBoard[row][col-1] = color;
                    let fit = fitness(newBoard, color);
                    list.push(makeBoardObj(newBoard, parent, fit));
                }
                if(isRight)
                {
                    let newBoard = JSON.parse(JSON.stringify(board));
                    newBoard[row][col] = 'N';
                    newBoard[row][col+1] = color;
                    let fit = fitness(newBoard, color);
                    list.push(makeBoardObj(newBoard, parent, fit));
                }
            }
        }
        return list
    }

    //Создание объекта просчёта хода
    function makeBoardObj(board, parent, fitness)
    {
        return{
            board,
            parent,
            fitness
        }
    }

    //Расчёт ценности доски
    //Количество фишек, которыми может походить противник
    function fitness(board, color)
    {
        let opColor;
        let counter = 0;
        if(color=='W'){opColor="B"};
        if(color=='B'){opColor="W"};

        for(i=0; i< board.length; i++)
        {
            for(j=0 ;j<board[0].length; j++)
            {
                let isBot =i>0 && board[i-1][j]==color && board[i][j]==opColor;
                let isTop =i<board.length-1 && board[i+1][j]==color && board[i][j]==opColor;
                let isLeft= j>0 && board[i][j-1]==color && board[i][j]==opColor;
                let isRight =j<board[0].length-1 && board[i][j+1]==color && board[i][j]==opColor;

                if (isBot|| isTop ||isLeft||isRight){
                    counter++}
            }
        }
        return counter;
    }

    function showWin(color)
    {
        $("#game-board").addClass('hidden');
        $(".logo").animate({
            "width": "100%"
        },500);
        $("#win-screen").removeClass('hidden');
        $("#win-text").animate({
            "font-size": "100px"
        },500);
        $("#restart-btn").animate({
            'width': '600px',
            'height': '140px',
            'font-size': '80px',
            'border-radius': '20px'
        },500);
        if(color=="W"){$('#win-text').text("Белые победили")};
        if(color=="B"){$('#win-text').text("Чёрные победили")};
    }
})
